from django.db import models

class Trainer(models.Model):
    name = models.CharField(max_length=50)
    place = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, default="0")
    email = models.EmailField(unique=True)
    technology1 = models.CharField(max_length=50, blank=True, null=True)
    technology2 = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
