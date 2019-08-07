const { CardFactory } = require('botbuilder');

class MyMenu {

    recruitment() {
        var cards = [
            CardFactory.heroCard(
                'ตำแหน่งงานว่าง',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'สอบถามตำแหน่งงานว่าง',
                        value: 'สอบถามตำแหน่งงานว่าง'
                    },
                    {
                        type: 'imBack',
                        title: 'ส่ง Resume ได้ที่ไหน',
                        value: 'ส่ง Resume ได้ที่ไหน'
                    },
                    {
                        type: 'imBack',
                        title: 'ระยะเวลาการเปิดรับสมัคร',
                        value: 'ระยะเวลาการเปิดรับสมัคร'
                    }
                ])
            ),
            CardFactory.heroCard(
                'การสัมภาษณ์',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'สัมภาษณ์กี่รอบ',
                        value: 'สัมภาษณ์กี่รอบ'
                    },
                    {
                        type: 'imBack',
                        title: 'ขั้นตอนก่อนถึงช่วงสัมภาษณ์',
                        value: 'ขั้นตอนก่อนถึงช่วงสัมภาษณ์'
                    },
                    {
                        type: 'imBack',
                        title: 'ระยะเวลาทราบผลการสัมภาษณ์',
                        value: 'ระยะเวลาทราบผลการสัมภาษณ์'
                    }
                ])
            ),
            CardFactory.heroCard(
                ' การลาออก',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'ขอเอกสารลาออกได้ที่ไหน',
                        value: 'ขอเอกสารลาออกได้ที่ไหน'
                    },
                    {
                        type: 'imBack',
                        title: 'แจ้งลาออกล่วงหน้ากี่วัน',
                        value: 'แจ้งลาออกล่วงหน้ากี่วัน'
                    }
                ])
            )
        ]
        return cards;
    }

    payroll() {
        var cards = [
            CardFactory.heroCard(
                'กองทุนสำรองเลี้ยงชีพ',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'สมัครได้เมื่อไหร่',
                        value: 'สมัครได้เมื่อไหร่'
                    },
                    {
                        type: 'imBack',
                        title: 'เงินสมทบของนายจ้าง',
                        value: 'เงินสมทบของนายจ้าง'
                    },
                    {
                        type: 'imBack',
                        title: 'การถอนกองทุนสำรองเลี้ยงชีพ\nโดยไม่ลาออกจากงาน',
                        value: 'การถอนกองทุนสำรองเลี้ยงชีพโดยไม่ลาออกจากงาน'
                    }
                ])
            ),
            CardFactory.heroCard(
                'สลิปเงินเดือน',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'ดูสลิปเงินเดือนที่ไหน',
                        value: 'ดูสลิปเงินเดือนที่ไหน'
                    },
                    {
                        type: 'imBack',
                        title: 'ขอรับสลิปเงินเดือน\nเพื่อประกอบการทำธุรกรรม',
                        value: 'ขอรับสลิปเงินเดือนเพื่อประกอบการทำธุรกรรม'
                    }
                ])
            ),
            CardFactory.heroCard(
                ' หนังสือรับรองเงินเดือน',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'ต้องการขอรับหนังสือ\nรับรองเงินเดือน',
                        value: 'ต้องการขอรับหนังสือรับรองเงินเดือน'
                    }
                ])
            )
        ]
        return cards;
    }

    training() {
        var cards = [
            CardFactory.heroCard(
                '',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'หลังจากทดลองงานแล้ว\nจะนำเสนอผลงานตาม SHERA Way ได้เมื่อไหร่',
                        value: 'หลังจากทดลองงานแล้วจะนำเสนอผลงานตาม SHERA Way ได้เมื่อไหร่'
                    },
                    {
                        type: 'imBack',
                        title: 'การลงทะเบียนนำเสนอ SHERA Way',
                        value: 'การลงทะเบียนนำเสนอ SHERA Way'
                    },
                    {
                        type: 'imBack',
                        title: 'การเตรียมตัวนำเสนอ SHERA Way',
                        value: 'การเตรียมตัวนำเสนอ SHERA Way'
                    },
                    {
                        type: 'imBack',
                        title: 'การประกาศผลการนำเสนอผลงาน\nและการปรับตำแหน่ง',
                        value: 'การประกาศผลการนำเสนอผลงานและการปรับตำแหน่ง'
                    },
                    {
                        type: 'imBack',
                        title: 'การขอจัดฝึกอบรมภายใน',
                        value: 'การขอจัดฝึกอบรมภายใน'
                    }
                ])
            )
        ]
        return cards;
    }

    welfare() {
        var cards = [
            CardFactory.heroCard(
                'เงินสนับสนุน',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'เบิกเงินสวัสดิการอะไรได้บ้าง',
                        value: 'เบิกเงินสวัสดิการอะไรได้บ้าง'
                    },
                    {
                        type: 'imBack',
                        title: 'วันที่ส่งเอกสารเบิกเงินสวัสดิการ',
                        value: 'วันที่ส่งเอกสารเบิกเงินสวัสดิการ'
                    }
                ])
            ),
            CardFactory.heroCard(
                'ค่ารักษาพยาบาล',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'ค่ารักษาพยาบาล',
                        value: 'ค่ารักษาพยาบาล'
                    },
                    {
                        type: 'imBack',
                        title: 'วิธีการเบิกค่ารักษาพยาบาล',
                        value: 'วิธีการเบิกค่ารักษาพยาบาล'
                    }
                ])
            ),
            CardFactory.heroCard(
                'ประกาศราคาน้ำมัน',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'สอบถามราคาน้ำมัน\nMile Rate ประจำเดือนนี้',
                        value: 'สอบถามราคาน้ำมัน Mile Rate ประจำเดือนนี้'
                    }
                ])
            ),
            CardFactory.heroCard(
                'Fleet Card',
                CardFactory.images(['']),
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'ลืม Password บัตร Fleet Card',
                        value: 'ลืม Password บัตร Fleet Card'
                    },
                    {
                        type: 'imBack',
                        title: 'บัตร Fleet Card หายต้องทำอย่างไร',
                        value: 'บัตร Fleet Card หายต้องทำอย่างไร'
                    }
                ])
            )
        ]
        return cards;
    }

}

module.exports.MyMenu = MyMenu;