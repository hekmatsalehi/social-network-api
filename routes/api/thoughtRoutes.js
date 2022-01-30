const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    deleteThoughtReaction,
 
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addThoughtReaction)

// api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteThoughtReaction)

module.exports = router;
