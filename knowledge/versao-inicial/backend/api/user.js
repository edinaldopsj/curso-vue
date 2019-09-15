const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
	const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

	const encryptPassword = password => {
		const salt = bcrypt.genSaltSync(10)
		return bcrypt.hashSync(password, salt)
	}

	const save = async (req, res) => {
		const user = { ...req.body }

		//Se vier um ID, seta no objeto
		if(req.params.id) user.id = req.params.id

		//Validações
		try {
			//Tentar fazer isso num aray em função
			existsOrError(user.name, 'Nome não informado!')
			existsOrError(user.email, 'Email não informado!')
			existsOrError(user.password, 'Senha não informada!')
			existsOrError(user.confirmPassword, 'Confirmação de senha não informada!')
			equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem') 

			//Chama o knex pra pedir informações do usuário, consultando o banco
			const userFromDB = await app.db('users')
				.where({ email: user.email }).first()

			//Se não houver ID pré inserido, ou seja, nao é update e o usuário já existir, avisa
			if(!user.id) {
				notExistsOrError(userFromDB, 'Usuário já cadastrado!')
			}
		} catch (msg) {
			return res.status(400).send(msg)
		}

		//Encripta o password do usuário
		user.password = encryptPassword(user.password)
		delete user.confirmPassword

		if(user.id) {
			app.db('users')
				.update(user)
				.where({ id: user.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
			} else {
				app.db('users')
					.insert(user)
					.then(_ => res.status(204).send())
					.catch(err => res.status(500).send(err))
		}
	}

	const get = (req, res) => {
		app.db('users')
			.select('id', 'name', 'email', 'admin')
			.then(users => res.json(users))
			.catch(err => res.status(500).send(err))
	}

	const getById = (req, res) => {
		app.db('users')
			.select('id', 'name', 'email', 'admin')
			.where({id: req.params.id})
			.first()
			.then(user => res.json(user))
			.catch(err => res.status(500).send(err))
	}

	return { save, get, getById }
}