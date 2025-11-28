export interface LevelOption {
  id: string
  label: string
  altText: string
  illustrationId: string
  isCorrect: boolean
  featureAudio?: string // 植物特征语音（可选）
}

export interface LevelData {
  id: number
  theme: string
  title: string
  mascotMood: "happy" | "curious" | "excited" | "thinking"
  teachTitle: string
  teachContent: string
  teachIllustrationId: string
  quizQuestion: string
  options: LevelOption[]
  correctFeedback: string
  hintText: string
  summaryPoint: string
  bgColor: string
  extendedKnowledge: {
    story: string
    summary: string
  }
}

export const levelsData: LevelData[] = [
  {
    id: 1,
    theme: "香茅的家",
    title: "香茅住在哪里呀？",
    mascotMood: "curious",
    teachTitle: "暖暖的阳光和水",
    teachContent: "香茅宝宝喜欢晒太阳！它需要喝很多水，但是害怕冷冷的地方哦！",
    teachIllustrationId: "teach-sunny-garden",
  quizQuestion: "香茅宝宝喜欢住哪里？是暖暖的花园还是冷冷的雪地呢？认真想想哦！",
    options: [
      {
        id: "env-correct",
        label: "暖暖花园",
        altText: "有太阳和水的温暖花园",
        illustrationId: "sunny-garden",
        isCorrect: true,
        featureAudio: "这是一个有太阳和小花的花园，暖暖的很舒服！",
      },
      {
        id: "env-wrong",
        label: "冷冷雪地",
        altText: "有雪的寒冷地方",
        illustrationId: "snowy-land",
        isCorrect: false,
        featureAudio: "这是一片白白的雪地，冷冷的，还飘着雪花呢！",
      },
    ],
    correctFeedback: "哇！你好棒！香茅喜欢暖暖的家！学到的知识：香茅喜欢温暖有水的地方",
    hintText: "香茅怕冷哦，它喜欢暖暖的地方！",
    summaryPoint: "香茅喜欢温暖有水的地方",
    bgColor: "bg-amber-50",
    extendedKnowledge: {
      story: "小朋友，你知道吗？香茅宝宝就像一个爱晒太阳的小娃娃！它每天都要喝好多好多水，就像小朋友口渴要喝水一样。如果天气太冷，香茅宝宝就会冻得发抖，说『好冷好冷，我不喜欢！』所以香茅宝宝最喜欢住在暖暖的花园里，有太阳公公陪着它，还有小蝴蝶来找它玩呢！",
      summary: "记住啦！香茅喜欢温暖有水的地方，就像小朋友喜欢温暖的家一样！",
    },
  },
  {
    id: 2,
    theme: "香茅的样子",
    title: "香茅长什么样？",
    mascotMood: "happy",
    teachTitle: "扁扁长长的叶子",
    teachContent: "香茅的叶子是扁扁的，长长的，像小剑一样！不是圆圆的管子哦！",
    teachIllustrationId: "teach-lemongrass",
    quizQuestion: "哪个是香茅宝宝？",
    options: [
      {
        id: "shape-correct",
        label: "扁叶香茅",
        altText: "扁扁叶子的香茅",
        illustrationId: "lemongrass",
        isCorrect: true,
        featureAudio: "香茅的叶子是扁扁的，长长的，像小剑一样！",
      },
      {
        id: "shape-wrong",
        label: "圆管大葱",
        altText: "圆管状的大葱",
        illustrationId: "green-onion",
        isCorrect: false,
        featureAudio: "大葱的叶子是圆圆的，像管子一样！",
      },
    ],
    correctFeedback: "太厉害了！你认出香茅啦！",
    hintText: "看看叶子，香茅是扁扁的哦！",
    summaryPoint: "香茅有扁扁长长的叶子",
    bgColor: "bg-green-50",
    extendedKnowledge: {
      story: "香茅宝宝的叶子可特别啦！它是扁扁的、长长的，像一把小剑！有的小朋友会把香茅和大葱搞混，但是大葱的叶子是圆圆的，像小管子。你可以用手轻轻摸一摸，扁扁的就是香茅，圆圆的就是大葱！香茅叶子还会随风摇摆，好像在跟小朋友招手说『你好呀！』",
      summary: "香茅有扁扁长长的叶子，像小剑一样，可不是圆管子哦！",
    },
  },
  {
    id: 3,
    theme: "香茅做美食",
    title: "香茅可以吃吗？",
    mascotMood: "excited",
    teachTitle: "柠檬香香的汤",
    teachContent: "香茅闻起来像柠檬！可以做酸酸辣辣的汤，叫冬阴功汤，非常好喝！",
    teachIllustrationId: "teach-tom-yum",
    quizQuestion: "香茅可以做什么好吃的？",
    options: [
      {
        id: "food-correct",
        label: "香香的汤",
        altText: "用香茅做的汤",
        illustrationId: "tom-yum-soup",
        isCorrect: true,
        featureAudio: "这是一碗热腾腾的汤，里面有虾和蔬菜，闻起来香香的！",
      },
      {
        id: "food-wrong",
        label: "甜甜蛋糕",
        altText: "甜蛋糕",
        illustrationId: "cake",
        isCorrect: false,
        featureAudio: "这是一个漂亮的蛋糕，上面有奶油和草莓，甜甜的！",
      },
    ],
    correctFeedback: "好棒！香茅可以做好喝的汤！",
    hintText: "香茅有柠檬香味，用来煮汤哦！",
    summaryPoint: "香茅可以做冬阴功汤",
    bgColor: "bg-orange-50",
    extendedKnowledge: {
      story: "香茅宝宝闻起来有一股柠檬香香的味道，好神奇呀！厨师叔叔阿姨最喜欢用香茅做汤啦！有一种汤叫冬阴功汤，里面有虾虾、蘑菇，还有香茅！喝一口，酸酸的、香香的，肚子里暖暖的，好舒服！小朋友以后去餐厅，可以闻闻看有没有香茅的柠檬香味哦！",
      summary: "香茅有柠檬香味，可以做好喝的冬阴功汤！酸酸香香真好喝！",
    },
  },
  {
    id: 4,
    theme: "香茅的魔法",
    title: "香茅有什么魔法？",
    mascotMood: "thinking",
    teachTitle: "赶走蚊子的魔法",
    teachContent: "香茅有神奇的味道，蚊子闻到就跑走啦！可以做成驱蚊水保护我们！",
    teachIllustrationId: "teach-mosquito-repellent",
    quizQuestion: "香茅可以做什么魔法水？",
    options: [
      {
        id: "med-correct",
        label: "驱蚊魔法水",
        altText: "赶走蚊子的神奇水",
        illustrationId: "mosquito-repellent",
        isCorrect: true,
        featureAudio: "这是一瓶神奇的水，喷一喷可以保护我们！",
      },
      {
        id: "med-wrong",
        label: "搭积木",
        altText: "彩色积木",
        illustrationId: "building-blocks",
        isCorrect: false,
        featureAudio: "这是彩色的积木，可以搭成各种形状，很好玩！",
      },
    ],
    correctFeedback: "哇！你学会香茅的魔法啦！",
    hintText: "蚊子不喜欢香茅的味道哦！",
    summaryPoint: "香茅可以做驱蚊精油",
    bgColor: "bg-purple-50",
    extendedKnowledge: {
      story: "香茅宝宝有一个超级厉害的魔法！蚊子最怕香茅的味道啦！小蚊子闻到香茅就会说『哎呀，好难闻，快跑快跑！』然后飞走了。所以人们把香茅做成驱蚊水，喷一喷，蚊子就不敢来咬小朋友啦！香茅就像一个小卫士，保护我们不被蚊子咬，是不是很厉害呀？",
      summary: "香茅可以做驱蚊精油，蚊子闻到就跑走啦！香茅是我们的小卫士！",
    },
  },
]
