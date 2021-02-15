from enum import Enum 

class ChoicesEnum(Enum):

    @classmethod
    def choices(cls): 
        return list(map(lambda c: (c.value, c.name), cls))