# -*- coding: utf-8 -*-
#===================================================================================================
#---    copyright 2017~2025, OBCon Inc.
#---    author gye hyun james kim <pnuskgh@gmail.com>
#---    license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
#===================================================================================================

import os
import sys

def getParentFolder(folderName):
    return os.path.dirname(os.path.abspath(folderName))

folderName = os.path.dirname(__file__)
sys.path.append(getParentFolder(getParentFolder(folderName)))
