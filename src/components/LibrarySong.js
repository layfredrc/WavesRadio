import React from 'react';

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, id, setSongs }) => {
    const songSelectHandler = async () => {
        // return un array
        await setCurrentSong(song);
        // Add Active State
        // parcours des sons pour changer l'attribut active a true lorsqu'il est selectionné
        // et les autres a false
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })

        setSongs(newSongs);
        // Verifier si une musique est jouée et attendre que la musique se load pour la lancer 
        // playAudio(isPlaying, audioRef);
        if (isPlaying) audioRef.current.play();


    }
    return (
        // toggle selected class pour la song active
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt="song-cover" />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}

export default LibrarySong;