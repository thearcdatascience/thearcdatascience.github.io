window.onload = function () {
  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#5ce1e6", "#f46a6a", "#5ce1e6"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#5ce1e6", "#f46a6a", "#5ce1e6"],
        maxParticles: 43,
        connectParticles: true
      }
    }
  ]
});
