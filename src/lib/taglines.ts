export const taglines = [
  'This catty cop can sniff out a rat - one decoded message at a time.',
  'Claws on the keyboard. Whiskers in the wind. The game of cat and mouse has begun.',
  "Unweaving the tapestry of the animal underworld, guided by sharp intellect, sharper claws, and the scent of a criminal's trail.",
  'Invisible trails, cryptic messages - a game of cat and mouse has never required this much computing power.',
  'Decrypting mysteries where shadows lie and all fur hides a secret.',
  "No code stands a chance against this kitty's curiosity, a whisker's twitch from the truth.",
  'Cracking codes and catching crooks, this pawsitively purrfect detective does it all.',
  'A whisker from the crime, a swift paw on the cipher, no riddle outwits this furry detective.',
  'Tales tangle in a world of feathers and fur. Every code broken; every crime served.',
  'In a jungle of criminals, every hoot, howl, and hiss speaks a code, and our feline detective is purrfectly fluent.',
  'Whiskers alert. Claws sharpened. World safe. Cats and mice in check - a different kind of cryptography.',
  'Furry fury meets criminal mystery: Never underestimate the wisdom whiskers.',
  'When cryptic codes meet sharp claws, not a criminal whisker goes unnoticed.',
  'With paw on the pulse of the animal underworld, code after encrypted code meets its match.',
  'Solving mysteries whisker by whisker, code by cryptic code.',
  'Chasing clues and cracking codes with only nine lives to risk.',
  'Serving justice one decoded mystery at a time, meet the feline force the underworld fears.',
  'Darting through shadows, deciphering danger: A clawful truth-bringer in a world of cunning critters.',
  'Sharper than a claw, quicker than a whisker - the best detective is a feline cryptographer.',
  'Prowling through a web of codes and conspiracies, one paw-print at a time.',
  'Cracking ciphers, chasing tails: Our feline is the furry face of justice in a world of sly foxes.',
  'Through hide and fur, under feathers and scales, no secret goes undiscovered by this feline sleuth.',
  'No code too twisted, no tail too tangled for the detective with a nose for mischief and a paw for cracking codes.',
  'One cat, nine lives, countless codes to unveil - the whiskered warden of the wild.',
  "Danger hisses, secrets meow and codes chirp - but they can't evade our feline folk-hero.",
  'A tale of tails, a melody of codes - decoded by sharp wit and sharpened claws.',
  "It's a jungle out there, filled with codes and claws. The detective's paws solve it all.",
  'Where the trail of paw-prints ends, the story of codes begins.'
];

export function randomTagline(): string {
  return taglines[Math.floor(Math.random() * taglines.length)];
}
