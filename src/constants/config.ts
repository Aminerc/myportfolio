type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Amine Ouardi Portfolio",
    fullName: "Amine Ouardi",
    email: "aminerc.business@outlook.com",
  },
  hero: {
    name: "Amine Ouardi",
    p: ["Data Analyst | Consultant EPM", "Vise à la performance"],
  },
  contact: {
    p: "Une question ? Une proposition ?",
    h2: "Contact",
    form: {
      name: {
        span: "Nom Complet",
        placeholder: "Arnaud Dupont...",
      },
      email: { span: "Email", placeholder: "email@exemple.com" },
      message: {
        span: "Message",
        placeholder: "Votre message ici...",
      },
    },
  },
  sections: {
    about: {
      p: "Profil",
      h2: "Introduction",
      content: 
      `Contrôleur de gestion, avec une forte appétence pour les données, pour l'analyse et la dataviz.
      Mes conaissances et competences techniques dans differentes technologies liées aux données me permet de comprendre et d'apprendre avec aisance de nouveaux domaines tech.
      Structuration, transformation, analyse et visualisation sont les 4 étapes de mon quotidien avec les données.
      Actuellement, je me forme activement aux outils d'Enterprise Performance Management (EPM) pour renforcer mes compétences en gestion et optimisation des performances d'entreprise.`
    },
    experience: {
      p: "Mon parcours profesionnel jusqu'à présent",
      h2: "Parcours pro",

    },
  feedbacks: {
    p: "Ceux qui m'ont fait confiance...",
    h2: "Avis clients",
    
    },
    works: {
      p: "Mes réalisations",
      h2: "Projets",
      content: `Les réalisations suivantes sont issues de cas réels et problématiques rencontrées lors de mes expériences passés.
      Les projets répondent à des problematiques métiers (manque de vision sur les finances, sur la masse salariale, sur le suivi du personnel...)
      mais aussi montrent mon envie de moderniser et delivrer des outils performants visant à améilorer le quotidien de chaqun.`
      ,
    },
  },
};