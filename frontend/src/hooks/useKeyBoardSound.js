const soundFiles = [
  "/sounds/keystroke1.mp3",
  "/sounds/keystroke2.mp3",
  "/sounds/keystroke3.mp3",
  "/sounds/keystroke4.mp3",
];

function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    // 1. Math.floor ensures a valid whole integer index (0, 1, 2, or 3)
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const soundPath = soundFiles[randomIndex];

    // 2. Create audio instance on trigger for crisp rapid-fire key presses
    const audio = new Audio(soundPath);
    audio.currentTime = 0;
    audio.volume = 0.5; // Optional: Adjust volume (0.0 to 1.0)
    audio.play().catch((error) => console.error("Audio failed to play:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyBoardSound;