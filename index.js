let participantes = [
  {
    nome: "Elton Baptista",
    email: "Eltonbaptista77@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00),
  },
  {
    nome: "Nadjer Machava",
    email: "Nadjer Machava@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 20, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Santos",
    email: "ana.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 14, 30),
    dataCheckIn: new Date(2024, 2, 20, 10, 15),
  },
  {
    nome: "Pedro Costa",
    email: "pedro.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 9, 45),
    dataCheckIn: null
  },
  {
    nome: "Sara Pereira",
    email: "sara.pereira@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 16, 10),
    dataCheckIn: new Date(2024, 0, 20, 12, 45),
  },
  {
    nome: "Ricardo Martins",
    email: "ricardo.martins@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 11, 20),
    dataCheckIn: null
  },
  {
    nome: "Marta Ferreira",
    email: "marta.ferreira@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 17, 50),
    dataCheckIn: new Date(2024, 2, 5, 14, 20),
  },
  {
    nome: "Bruno Carvalho",
    email: "bruno.carvalho@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 12, 15),
    dataCheckIn: new Date(2024, 0, 10, 9, 45),
  },
  {
    nome: "Carolina Sousa",
    email: "carolina.sousa@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 15, 30),
    dataCheckIn: new Date(2024, 2, 15, 20, 10),
  },
  {
    nome: "André Almeida",
    email: "andre.almeida@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 19, 40),
    dataCheckIn: new Date(2024, 0, 25, 16, 55),
  }
];

const creatnewparticipant = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
      data-email="${participante.email}"
      onclick="fazercheckIn(event)"
    >
      confirmar check-in
      </button>
    `
  }


  return ` 
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
       ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const updatelist = (participantes) => {
  let output = ""
  //Estrutura de repeticao - loop
  for (let participante of participantes) {
    output = output + creatnewparticipant(participante)
  }
  //Substituir informacao do html
  document
    .querySelector("tbody")
    .innerHTML = output
}

updatelist(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const DadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: DadosDoFormulario.get("Nome"),
    email: DadosDoFormulario.get("Email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
 
  // verificar se o participante existe
  const participanteexiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteexiste) {
    alert(`Email já cadastrado!`)
    return
  }

  participantes = [participante, ...participantes]
  updatelist(participantes)

  //limpar o formulario
  event.target.querySelector('[name="Nome"]').value = ""
  event.target.querySelector('[name="Email"]').value = ""
}

const fazercheckIn = (event) => {
  //confirmar se realmente quer o check in
  const mensagemconfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  if(confirm(mensagemconfirmacao) == false) {
    return
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar o check-in do participante

  participante.dataCheckIn = new Date()
  //atualizar a lista de participante
  updatelist(participantes)
}

