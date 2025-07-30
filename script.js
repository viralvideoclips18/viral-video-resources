document.addEventListener("DOMContentLoaded", () => {
  const adLink = window.customLinks?.adLink || "#";
  const realLink = window.customLinks?.realLink || "#";
  const downloadLink = window.customLinks?.downloadLink || "#";

  let clicked = false;

  const clickBtn = document.getElementById("clickNowBtn");
  if (clickBtn) {
    clickBtn.addEventListener("click", () => {
      if (!clicked) {
        clicked = true;
        window.location.href = adLink;
      } else {
        window.location.href = realLink;
      }
    });
  }

  const downloadBtn = document.getElementById('downloadBtn');
  const progressBar = document.getElementById('progressBar');
  const btnText = document.getElementById('btnText');
  const borderRect = document.querySelector('.circle-border-glow rect');

  let downloading = false;

  downloadBtn.addEventListener('click', () => {
    if (downloading) return;
    downloading = true;

    let progress = 0;
    const totalLength = 612;

    const interval = setInterval(() => {
      progress += 2;
      const offset = totalLength - (progress / 100) * totalLength;

      progressBar.style.width = progress + "%";
      borderRect.style.strokeDashoffset = offset;
      btnText.innerText = progress + " %";

      if (progress >= 100) {
        clearInterval(interval);
        btnText.innerText = "Download Ready!";

        setTimeout(() => {
          const a = document.createElement('a');
          a.href = downloadLink;
          a.download = "viral_clip.mp4";
          a.click();

          btnText.innerText = "Download Again";
          progressBar.style.width = "0%";
          borderRect.style.strokeDashoffset = totalLength;
          downloading = false;
        }, 1000);
      }
    }, 100);
  });
});
