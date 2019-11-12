const express = require('express');
const linebot = require('@line/bot-sdk');
const config = {
  channelAccessToken: "EcxKg0bmwpZgNB+5yJKKjGX+JNpIqnXj4QlBFE5l+NVIf5pwZEGYcBPzRwH+hDGOvE74EQeE4OKo26nLJAfjyf3wTo9MIbCjk7o9fs6u6Ce5rMdtCYy/2eCPcddTnSe9F1KcONDdbefNLvR5687y0wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "d99cfa99c2117a15985369b7e24d9fed",
};
const app = express();

app.set('port', (process.env.PORT || 3030));
app.post('/hook/', linebot.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});
app.use(express.static(__dirname + '/public'));

const client = new linebot.Client(config);
function handleEvent(event) {
    this.line = event;
    switch(event.type) {
        case 'message':
            messageEvent();
            break;
        case 'follow':
            followEvent();
            break;
        case 'unfollow':
            unfollowEvent();
            break;
        default:
            return Promise.resolve(null);
    }
}

function followEvent() {

    return client.replyMessage(this.line.replyToken, {
        "type": "imagemap",
        "baseUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/hoshi",
        "altText": "お友達追加ありがとうございます",
        "baseSize": {
            "width": 240,
            "height": 864
        },
        "actions": [
            {
                "type": "message",
                "text": "次のLESSONを始める",
                "area": {
                    "x": 0,
                    "y": 0,
                    "width": 520,
                    "height": 1040
                }
            }
        ]
    });
}

function messageEvent() {
    const {
        type,
        text,
    } = this.line.message;

    if (type !== 'text') {
        return Promise.resolve(null);
    }

    if (text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
        return client.replyMessage(this.line.replyToken, {
            "type": "image",
            "originalContentUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/mylove.jpg",
            "previewImageUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/mylove.jpg"
        });
    }
    if (text.includes('LESSONを始める')) {
        return client.replyMessage(this.line.replyToken, {
            "type": "imagemap",
            "baseUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/hoshi",
            "altText": "新しいレッスン",
            "baseSize": {
                "width": 240,
                "height": 864
            },
            "actions": [
                // {
                //     "type": "uri",
                //     "linkUri": "https://example.com/",
                //     "area": {
                //         "x": 0,
                //         "y": 586,
                //         "width": 520,
                //         "height": 454
                //     }
                // },
                {
                    "type": "message",
                    "text": "次のLESSONを始める",
                    "area": {
                        "x": 0,
                        "y": 0,
                        "width": 520,
                        "height": 1040
                    }
                }
            ]
        });
    }
    if (text.includes('キャンプ場')) {
        return client.replyMessage(this.line.replyToken,{
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                      "thumbnailImageUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/camp2.jpg",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "自由公園キャンプ場",
                      "text": "【牧場隣接でアクティビティ◎】\n・下総ICすぐ\n・風呂、シャワー完備",
                      "defaultAction": {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/123"
                      },
                      "actions": [
                          {
                              "type": "postback",
                              "label": "ここにする",
                              "data": "action=buy&itemid=111"
                          },
                          {
                              "type": "postback",
                              "label": "詳細を見る",
                              "data": "action=add&itemid=111"
                          }
                      ]
                    },
                    {
                      "thumbnailImageUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/camp1.jpg",
                      "imageBackgroundColor": "#000000",
                      "title": "新森広場キャンプ場",
                      "text": "【海に隣接したキャンプ場◎】\n・阿字ヶ浦駅徒歩10分\n・ウォシュレット完備",
                      "defaultAction": {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/222"
                      },
                      "actions": [
                          {
                              "type": "postback",
                              "style": "primary",
                              "label": "ここにする",
                              "data": "action=buy&itemid=222"
                          },
                          {
                              "type": "uri",
                              "label": "詳細を見る",
                              "uri": "http://example.com/page/222"
                          }
                      ]
                    }
                ],
                "imageAspectRatio": "rectangle",
                "imageSize": "cover"
            }
        })
    }

    if (text.includes('テント')) {
      return client.replyMessage(this.line.replyToken,{
          "type": "template",
          "altText": "this is a carousel template",
          "template": {
              "type": "carousel",
              "columns": [
                  {
                    "thumbnailImageUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/tent2.png",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "Nordisk Asgard 12.6+Kari Diamond 12",
                    "text": "【インスタ映え確実、北欧テント】\n・白いコットンテントでオシャレ\n・テントは高さがあり、広々",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "これにする",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "詳細を見る",
                            "data": "action=add&itemid=111"
                        }
                    ]
                  },
                  {
                    "thumbnailImageUrl": "https://liff-test-sumamo.herokuapp.com/src/s3/static/img/tent1.jpg",
                    "imageBackgroundColor": "#000000",
                    "title": "Hilder ROOMY",
                    "text": "【トンネル型2ルームテント】\n・広々リビングで居住スペース確保\n・サイドパネル調整で快適な空間作り",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "style": "primary",
                            "label": "これにする",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "詳細を見る",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                  }
              ],
              "imageAspectRatio": "rectangle",
              "imageSize": "cover"
          }
      })
  }

    return client.replyMessage(this.line.replyToken, {
        type: 'text',
        text: text
    });
}

app.listen(app.get('port'), function() {
    console.log('Node app is running -> port:', app.get('port'));
});