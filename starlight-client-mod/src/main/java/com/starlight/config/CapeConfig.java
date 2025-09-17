package com.starlight.config;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

public class CapeConfig {
    private static final Gson GSON = new Gson();
    private static final File CONFIG_FILE = new File(System.getProperty("user.home"), ".starlight_cape.json");

    public String capeUrl = "";

    public static CapeConfig load() {
        try (FileReader fr = new FileReader(CONFIG_FILE)) {
            return GSON.fromJson(fr, CapeConfig.class);
        } catch (Exception e) {
            return new CapeConfig();
        }
    }

    public void save() {
        try (FileWriter fw = new FileWriter(CONFIG_FILE)) {
            GSON.toJson(this, fw);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
