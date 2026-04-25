package com.freemc.launcher;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import java.io.IOException;
import java.util.Map;

public class LoginController {
    @FXML private TextField usernameField;
    @FXML private PasswordField passwordField;
    @FXML private Label statusLabel;

    private final AuthService authService = new AuthService();
    private String userId;

    @FXML
    private void handleLogin() {
        String username = usernameField.getText();
        String password = passwordField.getText();
        try {
            Map<String, Object> response = authService.login(username, password);
            userId = (String) response.get("userId");
            statusLabel.setText("Login successful! Rank: " + response.get("rank"));
        } catch (IOException e) {
            statusLabel.setText("Login failed: " + e.getMessage());
        }
    }

    @FXML
    private void handleWatchAd() {
        if (userId == null) {
            statusLabel.setText("Please login first");
            return;
        }
        try {
            authService.watchAd(userId);
            statusLabel.setText("Ad watched! Check rank update.");
        } catch (IOException e) {
            statusLabel.setText("Watch ad failed: " + e.getMessage());
        }
    }
}