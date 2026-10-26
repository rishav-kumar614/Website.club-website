from PIL import Image

W, H = 1920, 912
# Website Club background color: #f4f3ef -> (244, 243, 239)
bg_color = (244, 243, 239)
stage = Image.new('RGB', (W, H), bg_color)

avatar = Image.open('public/lisa/lisa_avatar_clean.png')

# Paste at exact offset (811, 198)
stage.paste(avatar, (811, 198), avatar)

stage.save('public/lisa/lisa_websiteclub_stage.png', quality=95)
stage.save('lisa-locomotive/lisa_websiteclub_stage.png', quality=95)
print("Pristine Website Club stage plate generated!")
