'use client'

import { useState } from 'react';

export default function FlashcardCreator() {
  const [cards, setCards] = useState([{ front: '', back: '' }]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  const addCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  const updateCard = (index: number, side: 'front' | 'back', value: string) => {
    const newCards = [...cards];
    newCards[index][side] = value;
    setCards(newCards);
  };

  const deleteCard = (index: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    setShowBack(false);
  };

  const flipCard = () => {
    setShowBack(!showBack);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🃏 Flashcard Creator
        </h1>
        
        <div className="mb-6 text-center">
          <button
            onClick={() => setStudyMode(!studyMode)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {studyMode ? 'Edit Mode' : 'Study Mode'}
          </button>
        </div>

        {!studyMode ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Create Flashcards</h2>
            
            {cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Card {index + 1}</h3>
                  <button
                    onClick={() => deleteCard(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Front (Question)
                    </label>
                    <textarea
                      value={card.front}
                      onChange={(e) => updateCard(index, 'front', e.target.value)}
                      className="w-full p-3 border rounded-lg h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter question or term..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Back (Answer)
                    </label>
                    <textarea
                      value={card.back}
                      onChange={(e) => updateCard(index, 'back', e.target.value)}
                      className="w-full p-3 border rounded-lg h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter answer or definition..."
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addCard}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add New Card
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                Card {currentCard + 1} of {cards.length}
              </p>
            </div>
            
            <div 
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 min-h-64 flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={flipCard}
            >
              <div className="text-center text-white">
                <p className="text-2xl font-semibold mb-4">
                  {showBack ? cards[currentCard]?.back : cards[currentCard]?.front}
                </p>
                <p className="text-sm opacity-75">
                  Click to {showBack ? 'show question' : 'show answer'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevCard}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              
              <button
                onClick={flipCard}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Flip Card
              </button>
              
              <button
                onClick={nextCard}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}