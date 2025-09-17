import React from 'react'

export default function StarlightPage() {
  return (
    <div className="prose p-8">
      <h1>Starlight Client</h1>
      <p>
        Starlight Client is a Fabric-based client mod template for Minecraft Java 1.21.x series. It is a starting
        point for building client-side mods and cosmetic systems like capes.
      </p>

      <h2>Supported versions</h2>
      <ul>
        <li>1.21</li>
        <li>1.21.1</li>
        <li>1.21.2</li>
        <li>1.21.3</li>
        <li>1.21.4</li>
        <li>1.21.5</li>
        <li>1.21.7</li>
        <li>1.21.8</li>
      </ul>

      <h2>How to build</h2>
      <p>Clone the repo and run Gradle with the target version:</p>
      <pre><code>cd starlight-client-mod
./gradlew build -Dmc=1.21.8</code></pre>

      <h2>Packaging to a native app</h2>
      <p>
        To create a native app bundle, bundle a JRE and a small launcher that sets up Fabric and the mod. Tools like
        <code>jpackage</code> or <code>packr</code> can be used. The mod itself is distributed as a file placed into the
        Fabric mods folder.
      </p>

      <h2>Custom Capes & Cosmetics</h2>
      <p>
        Implement client-side rendering to attach cape textures and cosmetic layers. Store user textures locally or
        load from user-provided URLs. Do not attempt to spoof server-side skin/cape data.
      </p>
    </div>
  )
}
