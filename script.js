const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.modal-close');

closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target === modal) modal.style.display = 'none'; });

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const type = btn.getAttribute('data-modal');
    if(type === 'about'){
      modalText.innerHTML = `
        <h2>Sobre mim</h2>
        <div class="about-container">
          <img src="perfil.jpg" alt="Foto de Fernando" class="profile-pic">
          <p>Sou Instrumentador Cirúrgico há 11 anos, mas a paixão por tecnologia e desenvolvimento sempre esteve presente na minha vida. Há cerca de 6 meses, decidi mergulhar de vez na Engenharia de Software e iniciar minha transição para a área de tecnologia.

Embora o curso que eu esteja fazendo seja mais lento e básico, sou extremamente autodidata e aprendo muito rápido. Desde que comecei, já desenvolvi dois projetos significativos praticamente sozinho, utilizando recursos online e ajuda de IAs para acelerar meu aprendizado.

Minha maior qualidade é a capacidade de aprender rápido e transformar ideias em código, sempre buscando melhorar e criar soluções práticas. Hoje, meu foco é me tornar um desenvolvedor Full Stack, unindo minha disciplina e experiência de anos na área da saúde com a criatividade e lógica da programação.</p>
        </div>`;
      modal.style.display = 'flex';
    } else if(type === 'skills'){
      generateSkillTree();
      modal.style.display = 'flex';
    } else if(type === 'projects'){
      modalText.innerHTML = '<h2>Projetos</h2><div class="projects-modal-container"></div>';
      const container = modalText.querySelector('.projects-modal-container');

      const projects = [
        {
          name: "Projeto 1",
          img: "projeto1.png",
          desc: "Desenvolvimento de um site de Dragon Ball Z."
        },
        {
          name: "Projeto 2",
          img: "projeto2.png",
          desc: "Landing page de desafio com layout fiel ao design do Figma."
        },
        {
          name: "Projeto 3",
          img: "projeto3.png",
          desc: "Portfólio pessoal online desenvolvido em HTML, CSS e JavaScript."
        }
      ];

      projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-modal-card';
        card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p>`;
        container.appendChild(card);

        const desc = card.querySelector('p');
        card.addEventListener('click', () => {
          desc.style.display = desc.style.display === 'block' ? 'none' : 'block';
        });
      });

      modal.style.display = 'flex';
    }
  });
});

function generateSkillTree() {
  modalText.innerHTML = '<h2>Habilidades</h2><div class="skill-tree" id="skill-tree"></div>';
  const tree = document.getElementById('skill-tree');

  const skills = [
    {name: 'Início', desc: 'Clique aqui para começar a árvore de habilidades.'},
    {name: 'HTML', desc: 'Conhecimento em HTML para estruturar páginas web.'},
    {name: 'CSS', desc: 'Estilização de páginas com CSS e conceitos de responsividade.'},
    {name: 'JavaScript', desc: 'Lógica e programação com JavaScript, manipulação DOM.'},
    {name: 'Node.js (loading)', desc: 'Aprendizado de backend com Node.js, em progresso.'}
  ];

  const nodes = [];
  const startX = 20;
  const startY = 50;
  const gapX = 250;
  const gapY = 60;

  skills.forEach((skill, i) => {
    const node = document.createElement('div');
    node.className = 'skill-node';
    node.innerText = skill.name;

    const yOffset = (i % 2 === 0) ? startY : startY + gapY;
    node.style.left = startX + i * gapX + 'px';
    node.style.top = yOffset + 'px';
    tree.appendChild(node);
    nodes.push(node);

    node.style.opacity = 0;

    node.addEventListener('click', e => {
      e.stopPropagation();

      document.querySelectorAll('.skill-card').forEach(c => c.remove());
      document.querySelectorAll('.line').forEach(l => l.remove());

      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerText = skill.desc;
      tree.appendChild(card);

      const nodeRect = node.offsetLeft;
      const nodeTop = node.offsetTop;
      card.style.left = nodeRect + 'px';
      card.style.top = nodeTop + 90 + 'px';
      setTimeout(() => { card.style.opacity = 1; }, 100);

      if(i+1 < skills.length){
        const nextNode = nodes[i+1];
        nextNode.style.opacity = 1;

        const line = document.createElement('div');
        line.className = 'line';
        tree.appendChild(line);

        const x1 = node.offsetLeft + 40;
        const y1 = node.offsetTop + 40;
        const x2 = nextNode.offsetLeft + 40;
        const y2 = nextNode.offsetTop + 40;
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}deg)`;
      }
    });

    if(i===0){ setTimeout(()=>{ node.style.opacity =1; }, 200); }
  });
}


