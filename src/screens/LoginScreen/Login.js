import './Login.css';

function Login() {
  return (
    <body>
      <nav class="menu">

      </nav>
      <article class="conteudo">
        <section class="bloco">
          <div class="titulo-centro">
            <div class="imgem-texto">
              <h1>EVD Shoes</h1>
            </div>
            <div class="imagem-texto">
            </div>
            <p>realize dreams</p>
          </div>
        </section>

        <section class="bloco">
          <form class="formulario" action="">
            <div class="sessao-input">
              <input class="input" type="text" placeholder="username" />
            </div>
            <div class="sessao-input">
              <input class="input" type="password" placeholder="password" />
            </div>
            <div class="bloco-botao">
              <button class="botao">Login</button>
              <button class="botao">Resgister</button>
            </div>
            <a href="" target="_blank">esqueci minha senha</a>
          </form>
        </section>

        <section class="bloco">

        </section>
      </article>
      <footer class="rodape">
        <div class="box">
          <p>Sobre a EVD Shoes</p>
          <p>Política de Privacidade</p>
          <p>Trabalhe conosco</p>
          <p>testando</p>
        </div>
        <div class="box">
          <p>Trocas e devoluções</p>
          <p>Entregas</p>
          <p>Como comprar</p>
          <p>Acessibilidade</p>
        </div>
        <div class="box">
          <p>Central de relacionamento</p>
          <p>testando</p>
          <p>testando</p>
          <p>testando</p>
        </div>
        <div class="box">
          <p>Redes sociais</p>
          <p><i class="devicon-facebook-plain"></i> Facebook</p>
          <p><i class="devicon-twitter-original"></i> Twitter</p>
          <p><i class="devicon-linkedin-plain"></i> Linkedin</p>
        </div>
      </footer>
      <hr/>
      <footer class="rodape-direitos">
        <div class="box">
          <span>
            Copyright © 2023 Todos os direitos reservados
          </span>
        </div>
        <div class="box">
          EVD Shoes
        </div>
        <div class="box">
          <p>Políticas de privacidade</p>
        </div>
      </footer>
    </body>
  );
}

export default Login;
