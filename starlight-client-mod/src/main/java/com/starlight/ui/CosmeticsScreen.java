package com.starlight.ui;

import com.starlight.StarlightClient;
import com.starlight.config.CapeConfig;
import com.starlight.cosmetics.CapeManager;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.screen.Screen;
import net.minecraft.client.gui.widget.ButtonWidget;
import net.minecraft.client.gui.widget.TextFieldWidget;
import net.minecraft.client.texture.Identifier;
import net.minecraft.client.util.math.MatrixStack;
import net.minecraft.text.LiteralText;
import net.minecraft.text.Text;

import javax.swing.*;
import java.awt.*;

public class CosmeticsScreen extends Screen {
    private TextFieldWidget urlField;
    private ButtonWidget loadUrlBtn;
    private ButtonWidget pickFileBtn;
    private ButtonWidget saveBtn;
    private Identifier previewId;

    protected CosmeticsScreen() {
        super(new LiteralText("Cosmetics"));
    }

    @Override
    protected void init() {
        super.init();
        int mid = this.width / 2;
        int y = 40;
        urlField = new TextFieldWidget(this.textRenderer, mid - 150, y, 300, 20, Text.of("Cape URL"));
        urlField.setText(StarlightClient.capeConfig.capeUrl == null ? "" : StarlightClient.capeConfig.capeUrl);
        this.addSelectableChild(urlField);

        loadUrlBtn = this.addButton(new ButtonWidget(mid - 150, y + 26, 90, 20, Text.of("Load URL"), b -> {
            String val = urlField.getText();
            if (val != null && !val.isEmpty()) {
                CapeManager.loadCapeAsync(val).thenAccept(id -> {
                    previewId = id;
                });
            }
        }));

        pickFileBtn = this.addButton(new ButtonWidget(mid - 54, y + 26, 110, 20, Text.of("Pick File"), b -> {
            // Use AWT file chooser as a pragmatic approach; may block the client thread so run it off-thread
            new Thread(() -> {
                try {
                    SwingUtilities.invokeAndWait(() -> {
                        JFileChooser chooser = new JFileChooser();
                        int ret = chooser.showOpenDialog(null);
                        if (ret == JFileChooser.APPROVE_OPTION) {
                            String path = chooser.getSelectedFile().getAbsolutePath();
                            CapeManager.loadCapeAsync(path).thenAccept(id -> {
                                previewId = id;
                            });
                        }
                    });
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }).start();
        }));

        saveBtn = this.addButton(new ButtonWidget(mid + 68, y + 26, 80, 20, Text.of("Save"), b -> {
            String val = urlField.getText();
            StarlightClient.capeConfig.capeUrl = val;
            StarlightClient.capeConfig.save();
        }));
    }

    @Override
    public void render(MatrixStack matrices, int mouseX, int mouseY, float delta) {
        this.renderBackground(matrices);
        drawCenteredText(matrices, this.textRenderer, this.title.asFormattedString(), this.width / 2, 20, 0xFFFFFF);

        super.render(matrices, mouseX, mouseY, delta);

        if (previewId != null) {
            // Render a preview quad using the texture; this is a simplified placeholder
            int px = this.width / 2 - 32;
            int py = 100;
            MinecraftClient.getInstance().getTextureManager().bindTexture(previewId);
            // draw texture (placeholder) using blit
            this.drawTexture(matrices, px, py, 0, 0, 64, 32);
        }
    }
}

