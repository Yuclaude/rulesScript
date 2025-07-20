//@name:弹幕扩展
//@version:3
//@remark:
//@order: A02
// ignore
import {} from '../../core/uz3lib.js'
import {} from '../../core/uzUtils.js'
// ignore

const appConfig = {
    _uzTag: '',
    /**
     * 扩展标识，初次加载时，uz 会自动赋值，请勿修改
     * 用于读取环境变量
     */
    get uzTag() {
        return this._uzTag
    },
    set uzTag(value) {
        this._uzTag = value
    },
}

class DanMu {
    constructor() {
        /**
         * 弹幕内容
         * @type {string}
         */
        this.content = ''

        /**
         * 弹幕出现时间 单位秒
         * @type {number}
         */
        this.time = 0
    }
}

class BackData {
    constructor() {
        /**
         * 弹幕数据
         * @type {DanMu[]}
         */
        this.data = []
        /**
         * 错误信息
         * @type {string}
         */
        this.error = ''
    }
}

class SearchParameters {
    constructor() {
        /**
         * 动画或影片名称
         */
        this.name = ''
        /**
         * 动画或影片集数
         */
        this.episode = ''

        /**
         * 所在平台剧集链接
         * v1.6.60 及以上版本可用
         */
        this.videoUrl = ''

        /**
         * 弹幕线路
         * v1.6.60 及以上版本可用
         */
        this.line = ''
    }
}

// 内置的弹幕解析线路
var danmuLines = []

/**
 * 获取所有弹幕线路，可选
 * v1.6.60 及以上版本可用
 * @returns {Promise<{lines: string[],error: string}>} result - 返回一个包含弹幕线路列表的 Promise 对象
 */

async function getLines() {
    let error = ''
    let allLines = await getEnv(appConfig.uzTag, '弹幕线路docker')
    let names = []
    if (allLines.length > 0) {
        var userLines = allLines.split(';').map((item) => {
            var arr = item.split('@')
            if (arr.length == 2) {
                return {
                    name: arr[0],
                    url: arr[1],
                }
            }
        })
        danmuLines = userLines
        // 去重，保留位置靠后的数据
        danmuLines = danmuLines.filter(
            (item, index, self) =>
                index === self.findLastIndex((t) => t.url === item.url)
        )
        // 检查是否存在 重名，并将重名的后面加上索引
        danmuLines.forEach((item) => {
            if (names.includes(item.name)) {
                item.name += '-' + danmuLines.indexOf(item)
            }
            names.push(item.name)
        })
    }
    return formatBackData({
        lines: danmuLines.map((item) => item.name),
        error: error,
    })
}

/**
 * 搜索弹幕
 * @param {Object} item - 包含搜索参数的对象
 * @param {string} item.name - 动画或影片的名称
 * @param {number} item.episode - 动画或影片的集数
 * @param {boolean} item.isMovie - 是否是电影
 * @returns {Promise<BackData>} backData - 返回一个 Promise 对象
 */
async function searchDanMu(item) {
    let backData = new BackData()
    let ddpList = []
    try {
        let all = []
        //MARK: - 实现你的弹幕搜索逻辑
        ddpList = await searchByDocker(item)

        all = all.concat(ddpList)
        backData.data = all
    } catch (error) {
        backData.error = error.toString()
    }
    if (backData.data.length == 0) {
        backData.error = '未找到弹幕:'
    }
    return formatBackData(backData)
}

async function searchByDocker(args) {
    let list = []
    try {
        let title = args.name
        let episode = args.episode
        //let movie = item.isMovie ? True : False 
        //获取弹幕线路链接
        let line = danmuLines[0].url
        let vdUrl = ''
		
        if (args.videoUrl && args.videoUrl.startsWith('http')) {
            vdUrl = args.videoUrl.trim() 
        }
		
        requestUrl = `${line}${title}&episode_number=${episode}&url=${vdUrl}`
		
        var danmuResult = await req(requestUrl)
        if (danmuResult == null) {
            return list
        }
        
        const dmdata =danmuResult.data
	    let dmnum = dmdata.length
	      //const danmuku = dmdata.danmuku
	      //list = dmnum
	    for (
            let index = 0;
            index < dmnum;
            index++
             ) {
                let element = dmdata[index]
                let danMu = new DanMu()
                danMu.content = element[1]
                danMu.time = element[0]
                list.push(danMu)
            }
    } catch (error) {}
    return list
}
