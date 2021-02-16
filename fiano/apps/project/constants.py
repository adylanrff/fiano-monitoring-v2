from enum import Enum
from common.enum import ChoicesEnum

class DeliverableStatusEnum(ChoicesEnum):
    GAMBAR_KERJA = "Gambar Kerja"
    BELANJA = "Belanja"
    SIPIL = "Sipil"
    PRODUKSI = "Produksi"
    DELIVERY = "Delivery"
    SETTING = "Setting"
    FINISHING = "Finishing"
    DONE = "Done"

class ProjectStatusEnum(ChoicesEnum):
    PERSIAPAN = "Persiapan"
    ON_PROGRESS = "On Progress"
    DONE = "Done"
