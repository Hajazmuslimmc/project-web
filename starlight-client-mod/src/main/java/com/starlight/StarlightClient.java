package com.starlight;

import com.starlight.config.CapeConfig;
import com.starlight.commands.OpenCosmeticsCommand;
import net.fabricmc.api.ClientModInitializer;
import net.fabricmc.api.EnvType;
import net.fabricmc.api.Environment;
import net.fabricmc.fabric.api.client.command.v2.ClientCommandManager;

@Environment(EnvType.CLIENT)
public class StarlightClient implements ClientModInitializer {
    public static CapeConfig capeConfig;

    @Override
    public void onInitializeClient() {
        capeConfig = CapeConfig.load();
        // Register a client command to open cosmetics UI (client-side)
        ClientCommandManager.DISPATCHER.register(ClientCommandManager.literal("/starlight_cosmetics").executes(c -> {
            return new OpenCosmeticsCommand().run(null);
        }));
        System.out.println("Starlight Client initialized");
    }
}
