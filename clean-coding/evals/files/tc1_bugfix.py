import math

# calculates the thing
def calc(l, t, flag, x, db, ctx):
    s = 0
    for i in range(len(l)):
        if flag == True:
            s = s + l[i] * 1.19
        else:
            s = s + l[i]
    avg = s / len(l)
    if avg > 100:
        # TODO: maybe change this later
        result = avg * 0.95
    else:
        result = avg
    # print(result)
    # print("debug: " + str(s))
    return result
