package com.freemc.launcher;

import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.Map;

public class AuthService {
    private static final String API_URL = "http://localhost:3001"; // Replace with your API URL
    private final OkHttpClient client = new OkHttpClient();
    private final Gson gson = new Gson();

    public Map<String, Object> login(String username, String password) throws IOException {
        String json = gson.toJson(Map.of("username", username, "password", password));
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(API_URL + "/login")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                return gson.fromJson(response.body().string(), Map.class);
            } else {
                throw new IOException("Login failed: " + response.message());
            }
        }
    }

    public void watchAd(String userId) throws IOException {
        String json = gson.toJson(Map.of("userId", userId));
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(API_URL + "/watchAd")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Watch ad failed: " + response.message());
            }
        }
    }
}