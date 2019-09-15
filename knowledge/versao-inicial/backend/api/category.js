module.exports = app => {
	const { existsOrError, notExistsOrError } = app.api.validation

	const save = (req, res) => {
		const category = { ...req.body }

		//Se houver um ID na requisicao seta, no id do objeto
		if(req.params.id) category.id = req.params.id

		//Ve se o nome está preenchido, senao n deixa passar
		try {
			existsOrError(category.name, 'Nome não informado!')
		} catch (msg) {
			return res.status(400).send(msg)
		}

		//Se houver ID atualiza, se não houver insere
		if(category.id) {
			app.db('categories')
				.update(category)
				.where({ id: category.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('categories')
				.insert(category)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const remove = async (req, res) => {
		try {
			existsOrError(req.params.id, 'Código da categoria não foi informado!')

			//Verifica se possui subcategorias vinculadas, se sim lança erro
			const subcategory = await app.db('categories')
				.where( { parentId: req.params.id })

			notExistsOrError(subcategory, 'Categoria possui subcategorias!')

			//Verifica se possui Artigos vinculadas, se sim lança erro
			const articles = await app.db('articles')
				.where({ categoryId: req.params.id })

			notExistsOrError(articles, 'Categoria possui artigos!')

			//Finalmente, depois de verificar que não há nada segurando a categoria, permite a exclusão
			const rowsDeleted = await app.db('categories')
				.where({ id: req.params.id }).del()

			//Se não retornar uma qt de linhas deletadas, significa que n deletou e n encontrou entao a categoria selecionada
			existsOrError(rowsDeleted, 'Categoria não encontrada')

			//Se passou por tudo isso, deu certo, e envia msg de sucesso, com array vazio(true)
			res.status(204).send()
		} catch (msg) {
			
		}
	}

	//Monta os caminhos com o pai
	const withPath = categories => {
		//Pega o pai, se houver um pai, ele retorna, senão nulo
		const getParent = (categories, parentId) => {
			const parent = categories.filter(parent => parent.id === parentId)
			
			return parent.length ? parent[0] : null
		}

		//Aqui gera o caminho da categoria
		const categoriesWithPath = categories.map(category => {
			let path = category.name
			let parent = getParent(categories, category.parentId) // Procura o pai da categoria, se tiver

			//Enquanto houver pais, concatena eles a string de path
			while(parent) {
				path = `${parent.name} > ${path}`
				parent = getParent(categories, parent.parentId)
			}
			
			return { ...category, path }
		})

		categoriesWithPath.sort((a,b) => {
			if(a.path < b.path) return -1
			if(a.path > b.path) return 1

			return 0
		})

		return categoriesWithPath
	}

	const get = (req, res) => {
		app.db('categories')
			.then(categories => res.json(withPath(categories)))
			.catch(err => err.status(500).send(err))
	}

	const getById = (req, res) => {
		app.db('categories')
			.where({ id: req.params.id })
			.first()
			.then(category => res.json(category))
			.catch(err => res.status(500).send(err))
	}

	return { save, remove, get, getById }
}