# Starlight Client (Fabric Mod Template)

This is a starting Fabric mod template intended to act as the basis for the "Starlight Client" client modifications for Minecraft Java 1.21.x.

Important: This repository contains a client-side Fabric mod skeleton only. Building a full custom client like Feather or Lunar involves substantial native code, UI, and may run into EULA or distribution issues. Do not use this to bypass authentication or anti-cheat protections.

Supported Minecraft versions:
- Intended to support 1.21.x series; change the `mc` Gradle property when building to target specific patch versions (e.g., `-Dmc=1.21.8`).

Quick build (Linux/macOS):

```bash
cd starlight-client-mod
./gradlew build -Dmc=1.21.7
```

To change target Minecraft version, pass `-Dmc=1.21.8` (or any 1.21.x) and update mappings accordingly.

Client-side cosmetics UI usage:
- In-game, run the client-side command `/starlight_cosmetics` to open the cosmetics UI (placeholder).
- The current cape URL is stored locally in `~/.starlight_cape.json` and can be changed from the UI (once implemented) or by editing the file.

Automating builds for multiple 1.21.x versions:
- You can run Gradle multiple times with different `mc` properties and produce separate JARs. Example script:

```bash
for v in 1.21 1.21.1 1.21.2 1.21.3 1.21.4 1.21.5 1.21.7 1.21.8; do
	./gradlew clean build -Dmc=${v}
	mkdir -p builds/${v}
	cp build/libs/*.jar builds/${v}/
done
```

Packaging as an app:
- A Fabric mod must be placed into a Fabric client distribution. To make a standalone app (launcher + client), package a Java runtime and a launcher that installs Fabric + this mod. Tools like `packr` or `jpackage` can create native app bundles.

Custom capes & cosmetics:
- Cosmetic features should be implemented client-side only and must not attempt to spoof server data. You can add custom cape textures loaded from local files or a user-configurable URL and render them on the player model client-side.

Example cape loader (Java):

```java
BufferedImage cape = CapeManager.loadCapeFromUrl("https://example.com/capes/minecape.png");
// Hook into Fabric rendering pipeline to attach the texture to the player model.
```

Next steps:
- Implement custom rendering hooks and UI using Fabric API and mixins.
- Add configuration UI and texture loader for capes/cosmetics.

Running a development client (run Minecraft with this mod):

```bash
./gradlew runClient -Dmc=1.21.8
```

Notes:
- The `runClient` task launches a development Minecraft instance with Fabric and the mod on the classpath (useful for testing mixins and client-side UI).
- The cosmetics UI can be opened with the client-side command `/starlight_cosmetics` (type into chat and press Enter).
- The file chooser uses AWT Swing which may behave differently across platforms; consider implementing a native in-game file picker if desired.
