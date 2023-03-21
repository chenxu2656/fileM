<template>
    <div id="container">
        <div></div>
        <div id="title">
            通知公告
        </div>
        <div id="lineBar">
        </div>
        <div id="con">
            <div id="ImgList">
                <div v-for="item in newsList" :key="item.title" class="newsItem">
                    <div class="date">
                        <div class="year">
                            2016
                        </div>
                        <div class="day">
                            08-24
                        </div>
                    </div>
                    <div class="con">
                        <div class="newsTit">{{ item.title }}</div>
                        <div class="newsCon">{{ item.content }}</div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div id="button">
            <div class="readMore">查看更多</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#container {
    background-color: #f2f2f2;
    padding: 1px 0px;
    margin-top: 40px;
    #title {
        color: $website_lightBlue;
        font-size: 35px;
        font-weight: 900;
        margin-top: 50px;
    }
    #subTitle {
        margin-top: 40px;
        color: $website_font_gray;
    }
    #lineBar {
        width: 80px;
        height: 20px;
        margin: auto;
        border-bottom: 3px solid $website_lightBlue;
    }
    #con {
        display: flex;
        width: 80vw;
        max-width: 1400px;
        margin: auto;
        margin-top: 30px;
        justify-content: space-between;
        #ImgList {
            // background-color: $websiet_back_gray;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            .newsItem {
                width: 30%;
                height: 100px;
                min-width: 350px;
                background-color: $websiet_back_gray;
                display: flex;
                cursor: pointer;
                transition-duration: 0.3s;
                transition-timing-function: ease-in;
                margin-top: 20px;
                &:hover {
                    background-color: #497beb;
                    * {
                        color: white;
                        border-color: white !important;
                    }
                    .newsCon {
                        color: white !important;
                    }
                }
                .date {
                    width: 25%;
                    margin-right: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: $website_font_gray;
                    align-items: center;
                    background-color: #dbdada;
                    .year {
                        font-size: 20px;
                        font-weight: 600;
                        height: 30px;
                        width: 50%;
                        border-bottom: 1.5px solid $website_font_gray;
                    }
                    .day {
                        margin-top: 10px;
                    }
                }
                .con {
                    width: 73%;
                    .newsTit {
                        width: 90%;
                        height: 40px;
                        font-weight: 700;
                        line-height: 40px;
                        font-size: 16px;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .newsCon {
                        width: 95%;
                        font-size: 16px;
                        text-align: left;
                        color: $website_font_gray;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            
        }
    }
    #button{
                margin-top: 40px;
                display: flex;
                justify-content: center;
                cursor: pointer;
                .readMore {
                    height: 40px;
                    width: 150px;
                    border: 1px solid $website_lightBlue;
                    line-height: 40px;
                    font-size: 20px;
                    color: $website_lightBlue;
                }
            }
}
</style>
<script setup>
import { ref } from 'vue'
const newsList = ref([
    {
        title: "同为国家战略，为中国制造2025改革同为国家战略，为中国制造2025改革同为国家战略，为中国制造2025改革",
        data: '2016-08-24',
        content: "同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革"
    },
    {
        title: "同为国家战略，为中国制造2025改革",
        data: '2016-08-24',
        content: "同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革"
    },
    {
        title: "同为国家战略，为中国制造2025改革",
        data: '2016-08-24',
        content: "同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革"
    },
    {
        title: "同为国家战略，为中国制造2025改革",
        data: '2016-08-24',
        content: "同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革，同为国家战略，为中国制造2025改革"
    }
])
</script>