title = "helirescure";

description = `
[click] catch
`;

characters = [
  `
 l
lll
l l
`,
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
  `,
];

options = {
  theme: "dark",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 8000,
  viewSize: {x: 100, y: 120}
};

/**
 * @type {{
 * from: Vector, to: Vector, vel: Vector,
 * ticks: number, prevLine: any, isActive: boolean
 * }[]}
 */
let lines;
let activeTicks;
/** @type {{pos: Vector, vel: Vector}[]} */
let human;
/** @type {{x: number, vx: number}} */
let player;
let multiplier;

function update() {
  if (!ticks) {
    lines = [];
    activeTicks = -1;
    human = [];
    player = { x: 40, vx: 1 };
    multiplier = 1;
  }
  if (lines.length === 0) {
    const from = vec(rnd(30, 70), 0);
    lines.push({
      from,
      to: vec(from),
      vel: vec(0.5 * difficulty, 0).rotate(PI / 2),
      ticks: ceil(30 / difficulty),
      prevLine: undefined,
      isActive: false,
    });
  }

  for(let i = 0; i < 5; i++){
    human.push({
      pos: vec(rnd(0, 100), 100),
    });
  }
  human.forEach((s) => {
    color("light_black");
    box(s.pos, 8);
});

  if (
    (player.x < 0 && player.vx < 0) ||
    (player.x > 99 && player.vx > 0)
  ) {
    play("laser");
    player.vx *= -1;
  }
  player.x += player.vx * sqrt(difficulty);
  color("black");
  if (
    char(addWithCharCode("b", floor(ticks / 10) % 2), player.x, 20, {
      mirror: { x: player.vx > 0 ? 1 : -1 },
    }).isColliding.rect.yellow
  ) {
  };
}
