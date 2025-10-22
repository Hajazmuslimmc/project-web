import React from 'react'

export default function AboutPage() {
  return (
    <div className="prose p-8">
      <h1>About NetworkAK</h1>

      <p>
        NetworkAK builds fast, accessible web games and client tooling focused on
        performance, usability, and fun. This site hosts small arcade and
        experimental projects — each game is intended to be easy to try and
        enjoyable to share.
      </p>

      <h2>Our Mission</h2>
      <p>
        Deliver lightweight, high-quality browser games and developer tools
        that are simple to run and maintain. We prioritise small download
        sizes, cross-platform compatibility, and strong privacy practices.
      </p>

      <h2>Team</h2>
      <ul>
        <li><strong>Lead:</strong> NetworkAK Team</li>
        <li><strong>Engineering:</strong> Frontend & tooling engineers</li>
        <li><strong>Design:</strong> UI/UX and pixel art</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For questions, feature requests, or commercial inquiries, email us at
        <a href="mailto:contact@networkak.com"> contact@networkak.com</a> or open
        an issue on the project repository.
      </p>

      <h2>Contribute</h2>
      <p>
        Contributions are welcome — submit issues or pull requests on GitHub. If
        you&#39;d like help shipping a feature or publishing a build, open an
        issue and tag it <code>help wanted</code>.
      </p>
    </div>
  )
}
