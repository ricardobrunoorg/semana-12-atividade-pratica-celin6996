[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/cBYbF4Ed)
# Trabalho Prático - Semana 12

Nesta atividade, vamos trabalhar com uma API de mercado para montar uma interface de visualização de filmes. Para isso, vamos utilizar a [The Movie DB API](https://developer.themoviedb.org/docs/getting-started). A página resultante deve listar os resultados de uma requisição HTTP no formato de cards e deve incluir uma funcionalidade de pesquisa ou filtro. 

## Informações Gerais

- Nome:Marcelo Artur Soares Sartori
- Matricula:924057

## Prints do trabalho

<<  COLOQUE A IMAGEM - LISTA DE CARDS COM FILMES - AQUI >>
![alt text](<Captura de tela 2026-06-01 180305.png>)
<<  COLOQUE A IMAGEM - RESULTADO DE UMA PESQUISA - AQUI >>
![alt text](<Captura de tela 2026-06-01 180459.png>)

O endpoint escolhido foi o de filmes mais bem avaliados (top_rated):
https://api.themoviedb.org/3/movie/top_rated?api_key=SUA_CHAVE&language=pt-BR&page=1

Ao carregar a página ou acionar busca/filtro, a função fetchMovies() monta a URL e faz uma chamada com fetch() à API do TMDB. A resposta é convertida com .json() e o array results é extraído — erros são capturados com try/catch. Em seguida, renderMovies() itera sobre os filmes, criando cada card via createMovieCard() e inserindo no DOM com appendChild().