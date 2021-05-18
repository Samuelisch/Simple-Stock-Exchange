function dropdown() {
    document.getElementById("drop-content").classList.toggle("show-dropdown");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-icon')) {
      let dropdowns = document.getElementById("drop-content");
      if (dropdowns.classList.contains('show-dropdown')) {
          dropdowns.classList.remove('show-dropdown');
      }
    }
  }