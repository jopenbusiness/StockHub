# -*- coding: utf-8 -*-
#===================================================================================================
#---    copyright 2017~2025, OBCon Inc.
#---    author gye hyun james kim <pnuskgh@gmail.com>
#---    license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
#===================================================================================================

from setuptools import setup, find_packages

version = '0.0.1'

def read_file(filename):
    lines = []
    with open(filename, 'r') as file:
        for line in file:
            lines.append(line)
    return lines

filename = 'stockhub/__init__.py'
lines = read_file(filename)
with open(filename, 'w') as file:
    for line in lines:
        if line.startswith('__version__'):
            file.write(f"__version__ = '{version}'\n")
        else:
            file.write(line)

#--- PYPI (Python Package Index)
setup(
    name='stockhub',
    version=version,
    author='gye hyun james kim', 
    author_email='pnuskgh@gmail.com', 
    description="증권사 Open API Hub 서비스", 
    keywords=[
        "Stock",
        "REST",
        "Open API",
        "Hub"
    ],
    url="https://github.com/jopenbusiness/StockHub",

    packages=find_packages(
        include=[ 
            'stockhub' 
        ],
        exclude=[]
    ),
    package_data={},
    install_requires=[
    ],
    python_requires='>=3.6'
)
