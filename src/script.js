window.onload = function () {
  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#5f0092", "#ffffff", "#5f0092"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#5f0092", "#ffffff", "#5f0092"],
        maxParticles: 43,
        connectParticles: true
      }
    }
  ]
});

