export const playAudio = (isPlaying, audioRef) => {
    // Verifier si une musique est jouée et attendre que la musique se load pour la lancer 
    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then((audio) => {
                audioRef.current.play();
            });
        }
    }
};