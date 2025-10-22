import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, orderBy, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// GET - Fetch all player tier entries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');

    const playerTiersRef = collection(db, 'playerTiers');

    let q;
    if (tier && tier !== 'ALL') {
      q = query(
        playerTiersRef,
        where('tier', '==', tier),
        orderBy('name', 'asc')
      );
    } else {
      q = query(
        playerTiersRef,
        orderBy('tier', 'asc'),
        orderBy('name', 'asc')
      );
    }

    const querySnapshot = await getDocs(q);
    const playerTiers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      addedAt: doc.data().addedAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json(playerTiers);
  } catch (error) {
    console.error('Error fetching player tiers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Add new player tier entry (mod only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player_id, name, tier, reason, added_by } = body;

    if (!player_id || !name || !tier || !reason || !added_by) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validTiers = ['S', 'A', 'B', 'C', 'D', 'F'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Check if player already exists
    const existingQuery = query(
      collection(db, 'playerTiers'),
      where('player_id', '==', player_id)
    );
    const existingDocs = await getDocs(existingQuery);

    if (!existingDocs.empty) {
      // Update existing player
      const existingId = existingDocs.docs[0].id;
      await updateDoc(doc(db, 'playerTiers', existingId), {
        name,
        tier,
        reason,
        added_by,
        updatedAt: new Date()
      });

      const updatedDoc = await getDoc(doc(db, 'playerTiers', existingId));
      return NextResponse.json({
        id: updatedDoc.id,
        ...updatedDoc.data()
      });
    } else {
      // Create new player entry
      const newPlayerRef = doc(collection(db, 'playerTiers'));
      const newPlayer = {
        player_id,
        name,
        tier,
        reason,
        added_by,
        addedAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(newPlayerRef, newPlayer);

      return NextResponse.json({
        id: newPlayerRef.id,
        ...newPlayer
      });
    }
  } catch (error) {
    console.error('Error creating player tier entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update player tier entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, tier, reason } = body;

    if (!id || !name || !tier || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await updateDoc(doc(db, 'playerTiers', id), {
      name,
      tier,
      reason,
      updatedAt: new Date()
    });

    const updatedDoc = await getDoc(doc(db, 'playerTiers', id));
    if (!updatedDoc.exists()) {
      return NextResponse.json({ error: 'Player tier entry not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Error updating player tier entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove player tier entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing player ID' }, { status: 400 });
    }

    await deleteDoc(doc(db, 'playerTiers', id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting player tier entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
