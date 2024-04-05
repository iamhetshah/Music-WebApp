from django.db import models

import time


class Data(models.Model):
    type = models.CharField(null=False, max_length=30)
    identifier = models.CharField(null=False, max_length=100)
    data = models.TextField(null=False)
    expiration = models.BigIntegerField()

    def __str__(self) -> str:
        return f'({self.type}) - {self.identifier}'
