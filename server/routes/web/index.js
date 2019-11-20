module.exports = app => {
  const Router = require('koa-router')
  const mongoose = require('mongoose')
  const router = new Router()
  const webrouter = new Router()

  // const Article = require('../../models/articles')
  // const Category = require('../../models/categories')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Ad = mongoose.model('Ad')
  const Hero = mongoose.model('Hero')

  // 导入新闻数据
  webrouter.get('/news/init', async ctx => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean()
    const newsTitles = [
      '9.22云顶之弈更新：元素崛起震荡云顶',
      '9.22版本更新公告：赛娜携真实伤害皮肤降临峡谷',
      '11月15日免费英雄更新公告',
      '游戏环境公示及处罚名单11月11日',
      '2019赛季即将结束',
      '11月7日比赛服下载地址更新公告',
      '11月8日免费英雄更换公告',
      '2019年度颁奖盛典奖项提名公布',
      '全明星周末首日 TheShy大战Doinb',
      '全明星投票接近尾声 最受欢迎选手将揭晓',
      'LPL七年攀登之路 我们是世界第一赛区！',
      '凤凰涅槃，热血高昂！ 庆FPX夺冠改编单曲',
      'LPL全明星看点十足 精彩对决一网打尽',
      '截至11月17日16:00全明星投票数据',
      '云顶魔法师成黑马 AOE爆发瞬间团灭',
      '9.22四大新崛起上单！蛮王梦魇成新贵',
      '支援型英雄胜率爆涨 新版本五路生态大评级',
      '元素崛起法海成主流 冷门影秘术完全体轻松压制',
      '亡者脱狱归来：赛娜入门攻略',
      '云顶S级阵容克制法 水晶游侠肉晕影剑士',
      '爆炸伤害快速成型 云顶纯输出影体系解析',
      'LOL：六守护神五倍护甲，雷霆霸体反伤输出，完爆物伤对面绝望',
      '云顶之巅：梦魇来袭 刺客崛起，红莲 钢铁6刺教学',
      '云顶之巅：以少敌多一D致胜，神超三星合成法解读',
      'GoDlike_神超 云顶之弈4影攻略',
      '云顶之巅：双熊出征 火海重生，红莲 T1炼狱法海教学',
      '云顶之巅：百劫大战 毒霸一方，神超船新版本解读（下）',
      '云顶之巅：光辉降临元素崛起，神超船新版本解读（上）'
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return { categories: randomCats.slice(0, 2), title: title }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    ctx.body = newsList
  })

  // 获取新闻数据
  webrouter.get('/news/list', async ctx => {
    // const cats = await Category.findOne({
    //   name: '新闻资讯'
    // })
    //   .populate({
    //     path: 'children',
    //     populate: {
    //       path: 'newsList'
    //     }
    //   })
    //   .lean()
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    // 聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles', // Article -> articles
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '综合',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate('categories')
        .limit(5)
        .lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === '综合' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    ctx.body = cats
  })

  // 导入轮播数据
  webrouter.get('/ads/init', async ctx => {
    const ads = {
      name: '轮播',
      items: [
        {
          image:
            'http://localhost:3000/uploads/acb3856fbe12a5fc92891c546d801072',
          title: '奇亚娜 至臻',
          url: 'https://lol.qq.com/act/a20191106truedamage/index.html'
        },
        {
          image:
            'http://localhost:3000/uploads/1f67f610dc01c5805025e2a69be8307a',
          title: '真实伤害盛大登场',
          url: 'https://lol.qq.com/act/a20191106truedamage/index.html'
        },
        {
          image:
            'http://localhost:3000/uploads/da6b0ab9941cd7204e99e21f2c41dd91',
          title: '2020LPL裁判招募',
          url: 'https://lol.qq.com/act/a20191106truedamage/index.html'
        },
        {
          image:
            'http://localhost:3000/uploads/994dee028ce4567bc3cf9d8437c05a2c',
          title: 'LPL全明星周末售票',
          url: 'https://lol.qq.com/act/a20191106truedamage/index.html'
        },
        {
          image:
            'http://localhost:3000/uploads/c556b9ffaa158346bff01584d5446ad5',
          title: '夺冠庆典现已开启',
          url: 'https://lol.qq.com/act/a20191106truedamage/index.html'
        }
      ]
    }
    await Ad.deleteMany({ name: '轮播' })
    await Ad.insertMany(ads)
    ctx.body = ads
  })

  // 获取轮播数据
  webrouter.get('/ads/list', async ctx => {
    const ads = await Ad.find({ name: '轮播' }).lean()
    const list = ads.length ? ads[0].items : []
    ctx.body = list
  })

  // 写入英雄数据
  webrouter.get('/heros/init', async ctx => {
    const heros = require('../../data/hero').hero
    await Hero.deleteMany({})
    // 插入英雄职业分类
    const parent = await Category.findOne({ name: '英雄职业' })
    const heroCats = [
      { name: '战士', role: 'fighter' },
      { name: '法师', role: 'mage' },
      { name: '刺客', role: 'assassin' },
      { name: '坦克', role: 'tank' },
      { name: '射手', role: 'marksman' },
      { name: '辅助', role: 'support' }
    ]
    await Category.deleteMany({ parent: parent._id })
    await Category.insertMany(
      heroCats.map(v => Object.assign({}, v, { parent: parent._id }))
    )
    const heros_ = await Category.find({ parent: parent._id })
    const list = heros.map(hero => {
      const categories = hero.roles
        .map(v => heroCats.find(cat => cat.role === v).name)
        .map(v => {
          return heros_.find(hero_ => hero_.name === v)._id
        })
      return {
        name: hero.name,
        avatar: `//ossweb-img.qq.com/images/lol/img/champion/${hero.alias}.png`,
        title: hero.title,
        categories: categories
      }
    })

    await Hero.deleteMany({})
    await Hero.insertMany(list)
    ctx.body = await Hero.find()
  })

  // 获取英雄数据
  webrouter.get('/heros/list', async ctx => {
    const parent = await Category.findOne({
      name: '英雄职业'
    })
    // 聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes', // heross --> 写 heroes-> collection 有问题？
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats }
        })
        .limit(10)
        .lean()
    })
    ctx.body = cats
  })

  // 获取英雄详情数据
  webrouter.get('/heros/:id', async ctx => {
    const data = await Hero.findById(ctx.params.id)
      .populate('categories')
      .populate('goods1')
      .populate('goods2')
      .lean()
    ctx.body = data
  })

  // 文章详情
  webrouter.get('/article/:id', async ctx => {
    const data = await Article.findById(ctx.params.id).lean()
    data.related = await Article.find({
      _id: { $ne: data._id }
    })
      .where({
        categories: { $in: data.categories }
      })
      .limit(2)
    ctx.body = data
  })

  router.use('/web/api', webrouter.routes(), webrouter.allowedMethods())

  app.use(router.routes()).use(router.allowedMethods())
}
