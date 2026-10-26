from PIL import Image
import numpy as np

alpha = Image.open('public/lisa/lisa_avatar_alpha.png')
arr = np.array(alpha).copy()

# Look at left side: x < 235, y < 650
for y in range(arr.shape[0]):
    for x in range(min(240, arr.shape[1])):
        r, g, b, a = arr[y, x]
        if a > 0:
            # Check if it's the flat gray wall patch
            if abs(int(r) - int(g)) <= 4 and abs(int(r) - int(b)) <= 4 and 160 <= r <= 185:
                arr[y, x, 3] = 0
            # Also bottom left sliver
            if y > 745 and x < 100:
                arr[y, x, 3] = 0

cleaned_alpha = Image.fromarray(arr, 'RGBA')
cleaned_alpha.save('public/lisa/lisa_avatar_clean.png')
print("Successfully cleaned wall shadow from avatar!")
