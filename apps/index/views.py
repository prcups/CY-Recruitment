from django.shortcuts import render
from .models import RcStudent
from django.http import HttpResponse
import os
import random
import string
import hashlib
import simplejson


def get_post(request):
    if request.method == "POST":
        req = simplejson.loads(request.body)
        # 检查token是否一致
        token = "114514" + req["code"] + "1919810" + req["phone_number"]
        if hashlib.md5(token.encode("utf-8")).hexdigest() != req["token"]:
            return HttpResponse(-1)
        phone = req["phone_number"]
        if RcStudent.objects.filter(phone_number=phone):
            return HttpResponse(-2)
        # 传入数据
        rc_student = RcStudent(
            name=req["name"],
            sex=req["sex"],
            birthday=req["birthday"],
            photo=req["photo"],
            phone_number=phone,
            qq_number=req["qq_number"],
            major=req["major"],
            subject=req["subject"],
            intro=req["intro"]
        )
        rc_student.save()
        return HttpResponse(0)


def get_photo(request):
    if request.method == "POST":
        file = request.FILES.get("photo")
        # 随机化图片名，但不改变扩展名
        [name, ext] = os.path.splitext(file.name)
        while True:
            rand_str = ''.join(random.sample(string.ascii_letters + string.digits, 28))
            if not os.path.exists(os.path.join("./static/images", rand_str + ext)):
                break
        destination = open(os.path.join("./static/images", rand_str + ext), 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        [name, name_end] = os.path.split(destination.name)
        destination.close()
        # 返回文件名，以便提交时传入数据库中
        return HttpResponse(name_end)


def get_code(request):
    # 依照接口随机生成口令、发送验证短信
    if request.method == "POST":
        req = simplejson.loads(request.body)
        phone_vali = req["phone_vali"]
        code = ''.join(random.sample(string.digits, 6))

        from aliyunsdkcore.client import AcsClient
        from aliyunsdkcore.request import CommonRequest
        client = AcsClient('LTAIGtHMSo8uMNtF', 'VGYoj6zFYhAv81SzyNraPAiphQvXgJ', 'cn-hangzhou')

        code_request = CommonRequest()
        code_request.set_accept_format('json')
        code_request.set_domain('dysmsapi.aliyuncs.com')
        code_request.set_method('POST')
        code_request.set_protocol_type('http')
        code_request.set_version('2017-05-25')
        code_request.set_action_name('SendSms')

        code_request.add_query_param('RegionId', "cn-hangzhou")
        code_request.add_query_param('PhoneNumbers', phone_vali)
        code_request.add_query_param('SignName', "代你飞")
        code_request.add_query_param('TemplateCode', "SMS_163052531")
        code_request.add_query_param('TemplateParam', "{code: " + code + "}")

        response = client.do_action(code_request)
        res = simplejson.loads(response)

        # 生成并返回token
        if res["Code"] == "OK":
            token = "114514" + code + "1919810" + phone_vali
            return HttpResponse(hashlib.md5(token.encode("utf-8")).hexdigest())
        else:
            print(res["Code"])
            return HttpResponse(-1)
