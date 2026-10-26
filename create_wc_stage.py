import numpy as np
from PIL import Image, ImageFilter

W, H = 1920, 912
alpha = Image.open('public/lisa/lisa_avatar_alpha.png')

# Create Website Club warm studio backdrop
# Base warm cream: #f4f3ef (244, 243, 239)
# Subtle soft radial studio light centered around the robot
bg = np.zeros((H, W, 3), dtype=np.float32)

for y in range(H):
    for x in range(W):
        # Distance from studio light focus near robot (1130, 480)
        dist = np.sqrt(((x - 1130) / (W * 0.75)) ** 2 + ((y - 480) / (H * 0.8)) ** 2)
        dist = np.clip(dist, 0.0, 1.0)
        # Interpolate between soft bright highlight (249, 248, 245) and warm canvas (244, 243, 239)
        r = 250 - dist * 7
        g = 249 - dist * 7
        b = 246 - dist * 8
        bg[y, x] = [r, g, b]

bg_img = Image.fromarray(np.uint8(bg), 'RGB')

# Soft ambient contact shadow under the robot
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
# Robot bottom is around y = 198 + 772 = 970 (floor)
# Shadow oval under collar/base
import math
for y in range(600, 912):
    for x in range(750, 1500):
        dx = (x - 1130) / 260
        dy = (y - 870) / 75
        d = dx*dx + dy*dy
        if d < 1.0:
            opacity = int((1.0 - d) * 35) # Very soft subtle ambient contact shadow
            shadow.putpixel((x, y), (40, 35, 30, opacity))

shadow = shadow.filter(ImageFilter.GaussianBlur(25))
bg_img = Image.alpha_composite(bg_img.convert('RGBA'), shadow)

# Paste alpha avatar at exact offset (811, 198)
bg_img.paste(alpha, (811, 198), alpha)

# Save as public/lisa/lisa_websiteclub_stage.png and lisa-locomotive/lisa_websiteclub_stage.png
bg_img = bg_img.convert('RGB')
bg_img.save('public/lisa/lisa_websiteclub_stage.png', quality=95)
bg_img.save('lisa-locomotive/lisa_websiteclub_stage.png', quality=95)
print("Successfully generated lisa_websiteclub_stage.png!")
