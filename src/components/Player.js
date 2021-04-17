import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight,faPause}  from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,setCurrentSong,setSongs}) => {
    // Use Effect
    // useEffect(() => {
    //     // Add active State
    //     // Chaque fois qu'on change de song useEffect va run ça
    //     // Au final pas besoin de useEffect on peut le faire via un handler
    //     const newSongs = songs.map((song) =>{
    //         if(song.id === currentSong.id){
    //             return {
    //                 ...song,
    //                 active:true,
    //             };
    //         }else{
    //             return {
    //                 ...song,
    //                 active:false,
    //             }
    //         }
    //     });
    //     setSongs(newSongs);
    //     // check if the song is playing
     
    // },[currentSong]);

    // Event Handlers

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) =>{
            if(song.id === nextPrev.id){
                return {
                    ...song,
                    active:true,
                };
            }else{
                return {
                ...song,
                active:false,
                }
            }
        });
        setSongs(newSongs);
    }

    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }

    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }


    // Format the time
    const getTime = (time) => {
        return(
            Math.floor(time/60 ) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const skipTrackHandler = async (direction) => {
        // recuperation de l'index du currentSong
        
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            // index out of bound donc on utilise modulo par le nb de songs au total pour reset l'incrementation
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            // appel du handler
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
            // quand le modulo retourne - 1 on assignera la derniere song sinon on décrémente l'index normalement
            // (length - 1) car retourne la taille et on veut avoir la derniere song 
        
        if(direction === 'skip-back'){
            if((currentIndex - 1 ) % songs.length === -1 ){
                await setCurrentSong(songs[songs.length - 1]);
                // playAudio(isPlaying,audioRef);
                activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
            
        }

        // playAudio(isPlaying,audioRef);
        if(isPlaying) audioRef.current.play();


    }

    // Add the styles 
    const trackAnim = {
        transform : `translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type="range"
                        onChange={dragHandler}
                    />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
               
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')}
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} />
                <FontAwesomeIcon 
                    onClick={playSongHandler}
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} />
                
            </div>
           
        </div>
    )
}

export default Player;