from django.contrib import admin
from django.utils.html import format_html

# Personalizar títulos del admin
admin.site.site_header = "🏨 Sistema de Gestión Hotelera"
admin.site.site_title = "Hotel Management"
admin.site.index_title = "Bienvenido al Sistema de Gestión Hotelera"

# Personalizar el tema
admin.site.enable_nav_sidebar = True
