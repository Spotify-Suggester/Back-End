const router=require('express').Router();
const {addSongToFavorites,findFavoriteSongs,deleteSongFromFavorites} =require('./favorite_songs-model');

router.get('/:id/favorites', async(req,res)=>{
    const {id}=req.params
    try{
        const favoriteSongs=await findFavoriteSongs(id)
        res.status(200).json(favoriteSongs)
    }
    catch(err){
       res.status(500).json(`Internal Server Error.Please try again`) 
    }
})

router.post('/:id/favorites/', async(req,res)=>{
    const {songId,ownerId}=req.body;
    try{
        const favoriteSong= await addSongToFavorites(songId,ownerId)
        res.status(201).json(favoriteSong)
    }catch(err){
        res.status(500).json(`Internal Server Error.Please try again later`)
    }
})

router.delete('/:id/favorites/:songid', async(req,res)=>{
    const {id,songid}=req.params;
    try{
        const favoriteSongs= await deleteSongFromFavorites(id,songid)
        res.status(201).json(favoriteSongs)
    }catch(err){
        res.status(500).json(err)
    }
})  




module.exports=router;