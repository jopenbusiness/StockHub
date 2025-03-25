# -*- coding: utf-8 -*-
#===================================================================================================
#---    copyright 2017~2025, OBCon Inc.
#---    author gye hyun james kim <pnuskgh@gmail.com>
#---    license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
#===================================================================================================

from stockhub.zztemp import hello

def test_hello():    
    assert hello() == 'Hello World!'

if __name__ == '__main__':
    test_hello()
