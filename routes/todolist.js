var express = require( 'express' );
var uuidV1 = require('uuid/v1');

var restRouter = express.Router();

var todolist = [
	{
		id: 1,
		text: 'ma première tâche',
		completed: false
	},
	{
		id: 2,
		text: 'ma deuxième tâche',
		completed: false
	}
];

restRouter.get('/', function (req, res) {
	res.json(todolist);
});

restRouter.post('/', function (req, res) {
	if(req.body.text!=null&&req.body.completed!=null){
		var item = {
			id: uuidV1(),
			text: req.body.text,
			completed: req.body.completed
		};
		todolist.push(item);
		res.json(todolist);
	}
	else{
		res.status(500).send({ error: 'ERROR'});
	}
});

//Complément

restRouter.put('/:id', function (req, res) {
	if(req.params.id){
		if(req.body.text!=null&&req.body.completed!=null){
			todolist.some(function(element, index, array){
				if(element.id==req.params.id){
					todolist[index].text = req.body.text;
					todolist[index].completed = req.body.completed;
					return true;
				}
			});
			res.json(todolist);
		}
		else{
			res.status(500).send({ error: 'ERROR'});
		}
	}
	else{
		res.status(500).send({ error: 'Missing id parameter (PUT /todolist/:id)'});
	}
});

restRouter.delete('/:id', function (req, res) {
	if(req.params.id){
		var ind = null
		todolist.some(function(element, index, array){
			if(element.id==req.params.id){
				ind = index;
				return true;
			}
		});
		if(ind!=null){
			todolist.splice(ind, 1);
			res.json(todolist);
		}
		else res.status(500).send({ error: 'invalid id !'});
	}
	else{
		res.status(500).send({ error: 'Missing id parameter (DELETE /todolist/:id)'});
	}
});

module.exports = restRouter;