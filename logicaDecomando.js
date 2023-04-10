
function gerarPdf(mensagem){
  const fileName = `documento_${new Date().toLocaleString()}.pdf`;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });
  
  doc.text(mensagem, 20, 20);
  
  doc.save(`./${fileName}`);

  // Carrega o PDF gerado usando o PDF.js
  PDFJS.getDocument(`./${fileName}`).then((pdf) => {
    // Obtém a primeira página do PDF
    pdf.getPage(1).then((page) => {
      const scale = 0.5;
      const viewport = page.getViewport({ scale });

      // Cria um elemento canvas para exibir a miniatura
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');

      // Renderiza a miniatura da primeira página do PDF no canvas
      page.render({ canvasContext: context, viewport }).then(() => {
        // Adiciona a miniatura na aba "Documentos Criados"
        const menuItem = document.querySelector('#documentos');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', `./${fileName}`);
        a.innerText = `Documento ${new Date().toLocaleString()}`;
        const img = document.createElement('img');
        img.setAttribute('src', canvas.toDataURL());
        a.prepend(img);
        li.appendChild(a);
        menuItem.appendChild(li);
      });
    });
  });
}


function formulario(){
  const formContainer = document.getElementById("form-container");
  const form = document.createElement("form");
  form.setAttribute("name", "my-form");
  form.setAttribute("method", "post");
  
  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("name", "name");
  inputName.setAttribute("placeholder", "Seu nome");
  
  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("name", "email");
  inputEmail.setAttribute("placeholder", "Seu email");
  
  const inputSolicitacao = document.createElement("input");
  inputSolicitacao.setAttribute("type", "text");
  inputSolicitacao.setAttribute("name", "solicitacao");
  inputSolicitacao.setAttribute("placeholder", "Sua solicitação");
  
  const inputValor = document.createElement("input");
  inputValor.setAttribute("type", "number");
  inputValor.setAttribute("name", "valor");
  inputValor.setAttribute("placeholder", "Valor");
  
  const btnSubmit = document.createElement("button");
  btnSubmit.setAttribute("type", "submit");
  btnSubmit.innerText = "Submeter";
  
  form.appendChild(inputName);
  form.appendChild(inputEmail);
  form.appendChild(inputSolicitacao);
  form.appendChild(inputValor);
  form.appendChild(btnSubmit);
  
  formContainer.appendChild(form);
 

  form.addEventListener("submit", function(event) {
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const solicitacao = form.elements["solicitacao"].value;
    const valor = form.elements["valor"].value;
    const respostas = "Nome: " + name + "\nEmail: " + email + "\nSolicitação: " + solicitacao + "\nValor: " + valor;
    event.preventDefault();
    console.log(respostas);
    gerarPdf(respostas);
    this.remove();
  });

  
}
const menuIcon = document.querySelector('.icone-menu');
const menu = document.querySelector('.menu');
menu.classList.toggle('open');
menuIcon.addEventListener("click", ()=>{
    menu.classList.toggle('open')
});


const closeMenuLink = document.querySelector(".fecha-menu");

closeMenuLink.addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    menu.classList.remove("open");
});


const enviar = document.querySelector(".tela-interface .entrada-caixa button");

enviar.addEventListener('click', async () => {
  formulario();
  
});
const dadosColaboradorTab = document.querySelector(".colaborador");

dadosColaboradorTab.addEventListener("click", () => {
  const container = document.createElement('div');

  fetch('/colaborador.html')
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
      document.body.appendChild(container);
      window.location.href = '/colaborador.html';
    });
});

const solicitarTab = document.querySelector(".solicitar");

dadosColaboradorTab.addEventListener("click", () => {
 
  fetch('solicitar.html')
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
      document.body.appendChild(container);
      window.location.href = 'solicitar.html';
    });
});