package com.starlight.cosmetics;

import com.mojang.blaze3d.platform.NativeImage;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.texture.DynamicTexture;
import net.minecraft.client.texture.NativeImageBackedTexture;
import net.minecraft.util.Identifier;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.concurrent.CompletableFuture;

public class CapeManager {
    private static Identifier loadedCapeId = null;

    public static CompletableFuture<Identifier> loadCapeAsync(String urlOrPath) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                BufferedImage img;
                if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
                    img = ImageIO.read(new URL(urlOrPath));
                } else {
                    img = ImageIO.read(new File(urlOrPath));
                }
                if (img == null) throw new IOException("Could not load image");
                // Convert BufferedImage to NativeImage
                NativeImage nativeImage = new NativeImage(img.getWidth(), img.getHeight(), false);
                for (int y = 0; y < img.getHeight(); y++) {
                    for (int x = 0; x < img.getWidth(); x++) {
                        int rgb = img.getRGB(x, y);
                        nativeImage.setPixelColor(x, y, rgb);
                    }
                }
                NativeImageBackedTexture texture = new NativeImageBackedTexture(nativeImage);
                Identifier id = new Identifier("starlight", "cape/" + Math.abs(urlOrPath.hashCode()));
                MinecraftClient.getInstance().getTextureManager().registerTexture(id, texture);
                loadedCapeId = id;
                return id;
            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        });
    }

    public static Identifier getLoadedCape() {
        return loadedCapeId;
    }
}

