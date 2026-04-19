(async function () {
  const list = document.getElementById("video-list");
  const qrBlock = document.getElementById("qr-block");

  try {
    const res = await fetch("videos.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("fetch failed: " + res.status);
    const data = await res.json();
    const videos = Array.isArray(data.videos) ? data.videos : [];

    if (videos.length === 0) {
      list.appendChild(renderEmpty());
    } else {
      for (const v of videos) list.appendChild(renderCard(v));
    }
  } catch (err) {
    console.error(err);
    list.appendChild(renderEmpty("Could not load videos.json"));
  }

  // Render QR block only if the image actually exists (avoids a broken icon before it's generated).
  const probe = new Image();
  probe.onload = () => {
    qrBlock.innerHTML = "";
    const img = document.createElement("img");
    img.src = "assets/qr-code.png";
    img.alt = "QR code linking to this page";
    const label = document.createElement("span");
    label.className = "footer__qr-label";
    label.textContent = "Scan to open this page on your phone.";
    qrBlock.appendChild(img);
    qrBlock.appendChild(label);
  };
  probe.src = "assets/qr-code.png";

  function renderCard(v) {
    const card = document.createElement("article");
    card.className = "video-card";

    const media = document.createElement("div");
    media.className = "video-card__media";

    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    if (v.poster) video.poster = v.poster;
    const source = document.createElement("source");
    source.src = v.src;
    source.type = v.type || "video/mp4";
    video.appendChild(source);
    media.appendChild(video);

    const body = document.createElement("div");
    body.className = "video-card__body";
    const h = document.createElement("h2");
    h.className = "video-card__title";
    h.textContent = v.title || "Untitled";
    const p = document.createElement("p");
    p.className = "video-card__desc";
    p.textContent = v.description || "";
    body.appendChild(h);
    if (v.description) body.appendChild(p);

    card.appendChild(media);
    card.appendChild(body);
    return card;
  }

  function renderEmpty(msg) {
    const el = document.createElement("div");
    el.className = "empty";
    el.innerHTML = `
      <span class="empty__badge">Coming soon</span>
      <h2 class="empty__title">Demo videos are on the way.</h2>
      <p class="empty__desc">${
        msg ||
        "We're putting the finishing touches on the walkthroughs. Check back shortly to see BrandFoundry in action."
      }</p>
    `;
    return el;
  }
})();
