const e = React.createElement;

function Logo({size=48}){
  return e('div',{className:'flex items-center gap-3'},
    e('svg',{width:size,height:size,viewBox:'0 0 64 64',fill:'none',xmlns:'http://www.w3.org/2000/svg',className:'rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1'},
      e('g',null,
        e('path',{d:'M16 40c6-12 18-12 24 0-6 12-18 12-24 0z',fill:'white',opacity:0.95}),
        e('circle',{cx:32,cy:24,r:6,fill:'white',opacity:0.95})
      )
    ),
    e('div',null,
      e('div',{className:'text-xl font-semibold'},"NovaAcademy"),
      e('div',{className:'text-xs text-gray-300 -mt-1'},"تعليم يلامس المستقبل")
    )
  );
}

function Header(){
  return e('header',{className:'p-6 bg-gradient-to-r from-transparent via-gray-800 to-transparent'},
    e('div',{className:'max-w-6xl mx-auto flex items-center justify-between'},
      e('div',{className:'flex items-center gap-4'}, e(Logo,{size:44})),
      e('nav',null,
        e('ul',{className:'flex gap-4'},
          e('li',null, e('a',{href:'#',className:'text-gray-300 hover:text-white'},"الرئيسية")),
          e('li',null, e('a',{href:'#courses',className:'text-gray-300 hover:text-white'},"الدورات")),
          e('li',null, e('a',{href:'#about',className:'text-gray-300 hover:text-white'},"عنّا"))
        )
      )
    )
  );
}

function CourseCard({course}){
  return e('div',{className:'bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-sm'},
    e('img',{src:course.image,alt:course.title,className:'rounded-lg w-full h-40 object-cover mb-3'}),
    e('h3',{className:'text-lg font-semibold mb-2'},course.title),
    e('p',{className:'text-sm text-gray-300 mb-3'},course.desc),
    e('div',{className:'flex justify-between items-center'},
      e('span',{className:'text-sm text-indigo-300 font-medium'},course.level),
      e('a',{href:'#',className:'px-3 py-1 bg-indigo-600 rounded-lg text-sm hover:opacity-90'},"ابدأ")
    )
  );
}

function App(){
  const courses = [
    {id:1, title:"مقدمة في التفكير الرياضي", desc:"دورة تفاعلية تجمع بين الشرح والتحدي العملي.", level:"متوسط", image:"https://images.unsplash.com/photo-1526378723039-8b1c3c8a9f5b?auto=format&fit=crop&w=800&q=60"},
    {id:2, title:"خوارزميات و برمجة", desc:"اسس الخوارزميات مع تمارين تفاعلية.", level:"مبتدئ", image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60"},
    {id:3, title:"تصميم تفاعلي"، desc:"تصميم واجهات احترافية وتجربة مستخدم"، level:"متقدم", image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60"},
  ];
  return e('div',null,
    e(Header),
    e('main',{className:'max-w-6xl mx-auto p-6'},
      e('section',{className:'mb-12'},
        e('div',{className:'grid grid-cols-1 md:grid-cols-2 gap-6 items-center'},
          e('div',null,
            e('h1',{className:'text-4xl font-bold mb-4'},"تعلم. تفكّر. تطبّق."),
            e('p',{className:'text-gray-300 mb-6'},"منصة تفاعلية لتعلم الرياضيات، البرمجة، والتصميم — بتجربة مستخدم عصرية وممتعة."),
            e('div',{className:'flex gap-3'},
              e('a',{href:'#courses',className:'px-5 py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:opacity-90'},"استعرض الدورات"),
              e('a',{href:'#',className:'px-5 py-3 border border-gray-700 rounded-lg text-gray-200'},"انضم الآن")
            )
          ),
          e('div',null,
            e('div',{className:'bg-gradient-to-br from-indigo-700 to-purple-700 rounded-2xl p-6 shadow-lg'},
              e('h3',{className:'text-xl font-semibold mb-2'},"ابدأ تحدّيك اليوم"),
              e('p',{className:'text-gray-200 mb-4'},"درس تجريبي تفاعلي — حل مسائل وتلقّ فورًا التقييم."),
              e('div',{className:'p-3 bg-white bg-opacity-8 rounded-lg'}, e('p',{className:'text-sm text-gray-200'},"مثال: حل معادلة x² - 5x + 6 = 0"))
            )
          )
        )
      ),
      e('section',{id:'courses',className:'mb-12'},
        e('h2',{className:'text-2xl font-semibold mb-6'},"الدورات المميزة"),
        e('div',{className:'flex flex-wrap gap-6'},
          courses.map(c => e(CourseCard,{key:c.id,course:c}))
        )
      ),
      e('section',{id:'about',className:'mb-12'},
        e('h2',{className:'text-2xl font-semibold mb-3'},"عن NovaAcademy"),
        e('p',{className:'text-gray-300'},"نسخة مبسطة تجريبية لواجهة منصة تعليمية أنيقة. تحتوي على واجهة أمامية جاهزة وواجهة خلفية نموذجية يمكن توصيلها بقاعدة بيانات PostgreSQL.")
      )
    ),
    e('footer',{className:'border-t border-gray-800 mt-12 p-6 text-center text-sm text-gray-400'},"© NovaAcademy 2025 — تصميم تجريبي")
  );
}

const domRoot = document.getElementById('root');
ReactDOM.createRoot(domRoot).render(e(App));
