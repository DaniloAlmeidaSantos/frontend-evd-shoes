import React from "react";
import "./BackofficeUser.css";

function BackofficeUser() {
    return (
        <main>
            <form>
                <h1>Cadastro</h1>
                <label for="nome">Nome:
                    <input type="text" id="nome" name="nome" required />
                </label>

                <label for="email">Email:
                    <input type="email" id="email" name="email" required />
                </label>
                <label for="cpf">CPF:
                    <input type="text" id="cpf" name="cpf" required />
                </label>
                <label for="senha">Senha:
                    <input type="password" id="senha" name="senha" required />
                </label>
                <label for="confirmar-senha">Confirmar senha:
                    <input type="password" id="confirmar-senha" name="confirmar-senha" required />
                </label>

                <label for="">

                </label>

                <div class="btnRegister">
                    <input type="submit" value="Cadastrar" />
                </div>
            </form>
        </main>
    );
}

export default BackofficeUser;