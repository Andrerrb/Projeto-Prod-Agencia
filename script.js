document.addEventListener('DOMContentLoaded', function() {
    //Elementos.
    const telas = document.querySelectorAll('.tela');
    const iniciarBtn = document.getElementById('iniciarBtn');
    const video = document.getElementById('interactiveVideo');
    const opcoes = document.querySelectorAll('.opcao');

    let telaAtual = 1;

    //Função para mudar tela.
    function mudarTela(novaTela){
        //Função para esconder as telas.
        telas.forEach(tela => tela.classList.remove('ativa'));

        //Mostra a nvoa tela.
        document.getElementById(`tela${novaTela}`).classList.add('ativa');
        telaAtual = novaTela;
    }

    //Gatilho no botão iniciar.
    iniciarBtn.addEventListener('click', function(){
        mudarTela(2);
        video.play().catch(e =>{
            console.log("Autoplay bloqueado: ", e);
            video.controls = true; //Mostra os controles se  o autoplay não funcionar.
        })
    });
    //Controle do vídeo.
    document.getElementById('homeBtn').addEventListener('click', () => mudarTela(1));
    document.getElementById('voltarBtn').addEventListener('click', () => mudarTela(telaAtual - 1));
    document.getElementById('avancarBtn').addEventListener('click',() => mudarTela(telaAtual + 1));
    document.getElementById('fullscreenBtn').addEventListener('click', ()=> {
        if (video.requestFullscreen) video.requestFullscreen();
    });

    //Eventos das opções de resposta
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', function(){
            // Remove destaque de todas as opções
            opcoes.forEach(o => o.style.backgroundColor = '');
            
            // Verifica se é a resposta correta (D)
            const respostaCorreta = this.textContent.includes('D. Todas as alternativas');
            
            if (respostaCorreta) {
                // Resposta correta: avança para tela 4 após 1 segundo
                setTimeout(() => mudarTela(4), 1000);
                // Esconde o botão de voltar ao vídeo caso esteja visível
                if (voltarVideoBtn) voltarVideoBtn.style.display = 'none';
            } else {
                // Resposta incorreta: mostra botão voltar ao vídeo
                if (voltarVideoBtn) voltarVideoBtn.style.display = 'flex';
            }
        });
    });
    //Botão finalizar.
    document.getElementById('finalizarBtn').addEventListener('click', ()=> mudarTela(1));

    //fFunção para quando o video terminar, ir para a tela de perguntas
    video.addEventListener('ended', ()=> mudarTela(3));

});